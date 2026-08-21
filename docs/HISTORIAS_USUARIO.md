# Historias de Usuario -- Dashboard

_Generado automaticamente el 2026-08-21T15:05:29.357Z -- no editar a mano, se sobreescribe en cada publicacion._

## HU-01: Autenticación y Recuperación de Contraseña

Como usuario del sistema, quiero iniciar sesión de forma segura y poder recuperar mi contraseña mediante correo electrónico para mantener el acceso a mi cuenta.

### Criterios de Aceptacion

- Inicio de sesión con credenciales válidas (email y contraseña).
- Solicitud de recuperación de contraseña que envía un correo electrónico con enlace o token seguro.
- Restablecimiento de contraseña tras ingresar el token válido.

### Detalle Tecnico y Reglas de Negocio

Endpoints para inicio de sesión, solicitud de recuperación y restablecimiento de clave.

## HU-02: Tablero Kanban para Gestión de Tareas

Como usuario, quiero visualizar y administrar mis tareas en un tablero Kanban con distintas columnas para organizar el progreso de mi trabajo.

### Criterios de Aceptacion

- Tablero estructurado con 4 columnas principales: To Do, Doing, Blocked y Done.
- Permitir la creación, lectura, actualización y eliminación (CRUD) de tareas.
- Permitir mover tareas entre los distintos estados (columnas).

### Detalle Tecnico y Reglas de Negocio

Endpoints API para tareas y actualización de estado de tareas.
