/**
 * Pruebas unitarias para el Requerimiento RF-01:
 * Registro e Inicio de Sesión de Usuario
 */

// Mock de localStorage para ejecución independiente
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const storage = (typeof localStorage !== 'undefined') ? localStorage : new LocalStorageMock();

const STORAGE_USERS = 'dashboard_users';
const STORAGE_SESSION = 'dashboard_current_user';

// Lógica de negocio de Autenticación bajo prueba
const Auth = {
  getUsers() {
    return JSON.parse(storage.getItem(STORAGE_USERS) || '[]');
  },

  saveUsers(users) {
    storage.setItem(STORAGE_USERS, JSON.stringify(users));
  },

  register(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, error: 'Todos los campos son requeridos' };
    }
    if (password.length < 6) {
      return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    if (users.some(u => u.email === cleanEmail)) {
      return { success: false, error: 'El correo electrónico ya está registrado' };
    }
    const newUser = { id: 'usr_' + Date.now(), name: name.trim(), email: cleanEmail, password };
    users.push(newUser);
    this.saveUsers(users);
    return { success: true, user: newUser };
  },

  login(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Credenciales requeridas' };
    }
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => u.email === cleanEmail && u.password === password);
    if (!user) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    const session = { user, loggedInAt: new Date().toISOString() };
    storage.setItem(STORAGE_SESSION, JSON.stringify(session));
    return { success: true, session };
  },

  getSession() {
    return JSON.parse(storage.getItem(STORAGE_SESSION) || 'null');
  },

  logout() {
    storage.removeItem(STORAGE_SESSION);
    return { success: true };
  }
};

// Runner simple de aserciones
function runTests() {
  const results = [];
  storage.clear();

  function test(description, fn) {
    try {
      fn();
      results.push({ description, passed: true });
      console.log(`✓ PASS: ${description}`);
    } catch (err) {
      results.push({ description, passed: false, error: err.message });
      console.error(`✗ FAIL: ${description}\n  ${err.message}`);
    }
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed');
  }

  console.log('--- Iniciando pruebas unitarias: RF-01 Autenticación ---');

  test('1. Debe registrar un nuevo usuario exitosamente con datos válidos', () => {
    const res = Auth.register('Juan Perez', 'juan@ejemplo.com', 'clave123');
    assert(res.success === true, 'El registro falló');
    assert(res.user.email === 'juan@ejemplo.com', 'El email no coincide');
    const users = Auth.getUsers();
    assert(users.length === 1, 'No se guardó el usuario en storage');
  });

  test('2. Debe rechazar el registro con contraseña menor a 6 caracteres', () => {
    const res = Auth.register('Ana Gomez', 'ana@ejemplo.com', '12345');
    assert(res.success === false, 'Permitió contraseña corta');
    assert(res.error.includes('al menos 6 caracteres'), 'Mensaje de error incorrecto');
  });

  test('3. Debe rechazar el registro de un email ya existente (duplicado)', () => {
    const res = Auth.register('Otro Juan', 'juan@ejemplo.com', 'password999');
    assert(res.success === false, 'Permitió email duplicado');
    assert(res.error.includes('ya está registrado'), 'Mensaje de error incorrecto');
  });

  test('4. Debe iniciar sesión exitosamente con credenciales válidas y persistir sesión', () => {
    const res = Auth.login('juan@ejemplo.com', 'clave123');
    assert(res.success === true, 'El login falló');
    assert(res.session.user.name === 'Juan Perez', 'El usuario de la sesión no coincide');
    const currentSession = Auth.getSession();
    assert(currentSession !== null, 'No se guardó la sesión');
  });

  test('5. Debe rechazar el inicio de sesión con contraseña incorrecta', () => {
    const res = Auth.login('juan@ejemplo.com', 'clave_erronea');
    assert(res.success === false, 'Permitió login con contraseña incorrecta');
    assert(res.error.includes('Credenciales inválidas'), 'Mensaje de error incorrecto');
  });

  test('6. Debe cerrar sesión y limpiar el almacenamiento de sesión', () => {
    Auth.logout();
    const currentSession = Auth.getSession();
    assert(currentSession === null, 'La sesión no se eliminó tras el logout');
  });

  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  console.log(`\nResumen: ${passed}/${total} pruebas superadas.`);

  return { total, passed, allPassed: total === passed, results };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Auth, runTests };
}

// Ejecutar si se corre directamente
if (typeof window === 'undefined' || window.runImmediately) {
  runTests();
}
