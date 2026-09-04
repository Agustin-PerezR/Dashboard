/**
 * Dashboard App - Requerimiento RF-01: Registro e Inicio de Sesión de Usuario
 * Alcance estricto: HU-01 / RF-01
 */

document.addEventListener('DOMContentLoaded', () => {
  // Storage Keys
  const STORAGE_USERS = 'dashboard_users';
  const STORAGE_SESSION = 'dashboard_current_user';

  // DOM Elements - Views
  const authContainer = document.getElementById('authContainer');
  const loginView = document.getElementById('loginView');
  const registerView = document.getElementById('registerView');
  const appLayout = document.getElementById('appLayout');

  // DOM Elements - Forms & Alerts
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginAlert = document.getElementById('loginAlert');
  const registerAlert = document.getElementById('registerAlert');

  // DOM Elements - Buttons & Links
  const btnGoRegister = document.getElementById('btnGoRegister');
  const btnGoLogin = document.getElementById('btnGoLogin');
  const btnLogout = document.getElementById('btnLogout');

  // DOM Elements - User Display
  const userNameDisplay = document.getElementById('userName');
  const userAvatarDisplay = document.getElementById('userAvatar');
  const profileNameDisplay = document.getElementById('profileNameDisplay');
  const profileEmailDisplay = document.getElementById('profileEmailDisplay');

  /* ==========================================================================
     AUTHENTICATION HELPERS (RF-01)
     ========================================================================== */
  function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  function getSession() {
    return JSON.parse(localStorage.getItem(STORAGE_SESSION) || 'null');
  }

  function saveSession(user) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify({ user, loggedInAt: new Date().toISOString() }));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_SESSION);
  }

  function showAlert(container, message, type = 'error') {
    container.textContent = message;
    container.className = `alert-message ${type === 'success' ? 'alert-success' : 'alert-error'}`;
    container.classList.remove('hidden');
  }

  function hideAlerts() {
    loginAlert.classList.add('hidden');
    registerAlert.classList.add('hidden');
  }

  /* ==========================================================================
     VIEW SWITCHING (RF-01)
     ========================================================================== */
  btnGoRegister.addEventListener('click', () => {
    hideAlerts();
    loginView.classList.add('hidden');
    registerView.classList.remove('hidden');
  });

  btnGoLogin.addEventListener('click', () => {
    hideAlerts();
    registerView.classList.add('hidden');
    loginView.classList.remove('hidden');
  });

  /* ==========================================================================
     FORM SUBMISSIONS (RF-01)
     ========================================================================== */
  // 1. Registro de usuario
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlerts();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    if (!name || !email || !password) {
      showAlert(registerAlert, 'Por favor completá todos los campos requeridos.');
      return;
    }

    if (password.length < 6) {
      showAlert(registerAlert, 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      showAlert(registerAlert, 'El correo electrónico ya está registrado.');
      return;
    }

    const newUser = { id: 'usr_' + Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);

    showAlert(registerAlert, '¡Cuenta creada con éxito! Iniciando sesión...', 'success');
    registerForm.reset();

    setTimeout(() => {
      saveSession(newUser);
      checkAuth();
    }, 800);
  });

  // 2. Inicio de sesión
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlerts();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showAlert(loginAlert, 'Credenciales inválidas. Verificá tu correo y contraseña.');
      return;
    }

    showAlert(loginAlert, '¡Inicio de sesión correcto!', 'success');
    loginForm.reset();

    setTimeout(() => {
      saveSession(user);
      checkAuth();
    }, 400);
  });

  // 3. Cierre de sesión
  btnLogout.addEventListener('click', () => {
    clearSession();
    checkAuth();
  });

  /* ==========================================================================
     SESSION VERIFICATION & ROUTE PROTECTION (RF-01)
     ========================================================================== */
  function checkAuth() {
    const session = getSession();
    if (session && session.user) {
      authContainer.classList.add('hidden');
      appLayout.classList.remove('hidden');

      const name = session.user.name || 'Usuario';
      userNameDisplay.textContent = name;
      userAvatarDisplay.textContent = name.charAt(0).toUpperCase();

      if (profileNameDisplay) profileNameDisplay.textContent = name;
      if (profileEmailDisplay) profileEmailDisplay.textContent = session.user.email;
    } else {
      appLayout.classList.add('hidden');
      authContainer.classList.remove('hidden');
      loginView.classList.remove('hidden');
      registerView.classList.add('hidden');
    }
  }

  // Inicializar estado de autenticación
  checkAuth();
});
