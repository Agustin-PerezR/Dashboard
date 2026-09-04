/* ==========================================================================
   DASHBOARD & AUTHENTICATION APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // LocalStorage Keys
  const STORAGE_USERS = 'dashboard_users';
  const STORAGE_SESSION = 'dashboard_session_token';
  const STORAGE_TASKS = 'dashboard_tasks';

  // DOM Elements - Views
  const authContainer = document.getElementById('authContainer');
  const appLayout = document.getElementById('appLayout');
  const loginView = document.getElementById('loginView');
  const registerView = document.getElementById('registerView');
  const forgotView = document.getElementById('forgotView');

  // DOM Elements - Auth Forms & Buttons
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const forgotForm = document.getElementById('forgotForm');

  const btnGoRegister = document.getElementById('btnGoRegister');
  const btnGoLogin = document.getElementById('btnGoLogin');
  const btnGoForgot = document.getElementById('btnGoForgot');
  const btnBackLogin = document.getElementById('btnBackLogin');
  const btnLogout = document.getElementById('btnLogout');

  const loginAlert = document.getElementById('loginAlert');
  const registerAlert = document.getElementById('registerAlert');
  const forgotAlert = document.getElementById('forgotAlert');

  // DOM Elements - App Header
  const userNameDisplay = document.getElementById('userName');
  const userAvatarDisplay = document.getElementById('userAvatar');

  // DOM Elements - Task Modal
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');
  const btnNewTask = document.getElementById('btnNewTask');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelTask = document.getElementById('btnCancelTask');
  const modalTaskTitle = document.getElementById('modalTaskTitle');

  // Helper: Get stored users
  function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
  }

  // Helper: Save users
  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  // Helper: Get active session
  function getSession() {
    return JSON.parse(localStorage.getItem(STORAGE_SESSION) || 'null');
  }

  // Helper: Save active session
  function saveSession(user) {
    const token = 'token_' + Math.random().toString(36).substring(2) + Date.now();
    const sessionData = { user, token, loggedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(sessionData));
  }

  // Helper: Clear session
  function clearSession() {
    localStorage.removeItem(STORAGE_SESSION);
  }

  // Helper: Show Alert
  function showAlert(element, message, type = 'error') {
    element.textContent = message;
    element.className = `alert-message alert-${type}`;
    element.classList.remove('hidden');
  }

  function hideAlert(element) {
    element.classList.add('hidden');
  }

  // Navigation between Auth Views
  btnGoRegister.addEventListener('click', () => {
    loginView.classList.add('hidden');
    forgotView.classList.add('hidden');
    registerView.classList.remove('hidden');
    hideAlert(registerAlert);
  });

  btnGoLogin.addEventListener('click', () => {
    registerView.classList.add('hidden');
    forgotView.classList.add('hidden');
    loginView.classList.remove('hidden');
    hideAlert(loginAlert);
  });

  btnGoForgot.addEventListener('click', () => {
    loginView.classList.add('hidden');
    registerView.classList.add('hidden');
    forgotView.classList.remove('hidden');
    hideAlert(forgotAlert);
  });

  btnBackLogin.addEventListener('click', () => {
    forgotView.classList.add('hidden');
    registerView.classList.add('hidden');
    loginView.classList.remove('hidden');
    hideAlert(loginAlert);
  });

  // Handle User Registration
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      showAlert(registerAlert, 'El correo electrónico ya está registrado.');
      return;
    }

    const newUser = { id: 'usr_' + Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);

    showAlert(registerAlert, '¡Cuenta creada con éxito! Iniciando sesión...', 'success');
    setTimeout(() => {
      saveSession(newUser);
      checkAuth();
    }, 1000);
  });

  // Handle User Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showAlert(loginAlert, 'Credenciales inválidas. Verificá tu correo y contraseña.');
      return;
    }

    showAlert(loginAlert, '¡Inicio de sesión correcto!', 'success');
    setTimeout(() => {
      saveSession(user);
      checkAuth();
    }, 500);
  });

  // Handle Password Recovery
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      showAlert(forgotAlert, 'No existe ninguna cuenta asociada a este correo.');
      return;
    }

    showAlert(forgotAlert, `Enlace de restablecimiento enviado a ${email}. Revisá tu bandeja de entrada.`, 'success');
    forgotForm.reset();
  });

  // Handle Logout
  btnLogout.addEventListener('click', () => {
    clearSession();
    checkAuth();
  });

  // Protect Routes & Check Authentication
  function checkAuth() {
    const session = getSession();
    if (session && session.user) {
      authContainer.classList.add('hidden');
      appLayout.classList.remove('hidden');
      userNameDisplay.textContent = session.user.name;
      userAvatarDisplay.textContent = session.user.name.charAt(0).toUpperCase();
      renderTasks();
    } else {
      appLayout.classList.add('hidden');
      authContainer.classList.remove('hidden');
      loginView.classList.remove('hidden');
      registerView.classList.add('hidden');
      forgotView.classList.add('hidden');
    }
  }

  /* ==========================================================================
     KANBAN BOARD TASK MANAGEMENT
     ========================================================================== */
  function getTasks() {
    const session = getSession();
    if (!session) return [];
    const allTasks = JSON.parse(localStorage.getItem(STORAGE_TASKS) || '[]');
    // Filter tasks for current logged in user
    return allTasks.filter(t => t.userId === session.user.id);
  }

  function saveTasks(tasks) {
    const session = getSession();
    if (!session) return;
    const allTasks = JSON.parse(localStorage.getItem(STORAGE_TASKS) || '[]');
    const otherTasks = allTasks.filter(t => t.userId !== session.user.id);
    const updated = [...otherTasks, ...tasks];
    localStorage.setItem(STORAGE_TASKS, JSON.stringify(updated));
    renderTasks();
  }

  function renderTasks() {
    const tasks = getTasks();
    const statuses = ['todo', 'doing', 'blocked', 'done'];

    statuses.forEach(status => {
      const listEl = document.getElementById(`colList${capitalize(status)}`);
      const badgeEl = document.getElementById(`badge${capitalize(status)}`);
      const colTasks = tasks.filter(t => t.status === status);

      badgeEl.textContent = colTasks.length;
      listEl.innerHTML = '';

      colTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.setAttribute('data-id', task.id);

        card.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', task.id);
        });

        card.innerHTML = `
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="task-desc">${escapeHtml(task.description || 'Sin descripción')}</div>
          <div class="task-footer">
            <span>${new Date(task.createdAt).toLocaleDateString()}</span>
            <div class="task-actions">
              <button class="icon-action-btn btn-edit-task" title="Editar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="icon-action-btn btn-delete-task" title="Eliminar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;

        card.querySelector('.btn-edit-task').addEventListener('click', () => openTaskModal(task));
        card.querySelector('.btn-delete-task').addEventListener('click', () => deleteTask(task.id));

        listEl.appendChild(card);
      });
    });
  }

  // Drag and Drop global functions
  window.allowDrop = function(e) {
    e.preventDefault();
  };

  window.drop = function(e, targetStatus) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = targetStatus;
      saveTasks(tasks);
    }
  };

  // Task Modal handlers
  function openTaskModal(task = null) {
    taskForm.reset();
    if (task) {
      modalTaskTitle.textContent = 'Editar Tarea';
      document.getElementById('taskId').value = task.id;
      document.getElementById('taskInputTitle').value = task.title;
      document.getElementById('taskInputDesc').value = task.description || '';
      document.getElementById('taskInputStatus').value = task.status;
    } else {
      modalTaskTitle.textContent = 'Nueva Tarea';
      document.getElementById('taskId').value = '';
      document.getElementById('taskInputStatus').value = 'todo';
    }
    taskModal.classList.remove('hidden');
  }

  function closeTaskModal() {
    taskModal.classList.add('hidden');
  }

  btnNewTask.addEventListener('click', () => openTaskModal());
  btnCloseModal.addEventListener('click', closeTaskModal);
  btnCancelTask.addEventListener('click', closeTaskModal);

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskInputTitle').value.trim();
    const description = document.getElementById('taskInputDesc').value.trim();
    const status = document.getElementById('taskInputStatus').value;

    const tasks = getTasks();
    if (id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
      }
    } else {
      const session = getSession();
      tasks.push({
        id: 'task_' + Date.now(),
        userId: session.user.id,
        title,
        description,
        status,
        createdAt: new Date().toISOString()
      });
    }
    saveTasks(tasks);
    closeTaskModal();
  });

  function deleteTask(id) {
    if (confirm('¿Estás seguro de que querés eliminar esta tarea?')) {
      const tasks = getTasks().filter(t => t.id !== id);
      saveTasks(tasks);
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => {
      const escape = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return escape[match];
    });
  }

  // Initialize Auth Check
  checkAuth();
});
