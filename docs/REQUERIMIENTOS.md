# Requerimientos -- Dashboard

_Generado automaticamente el 2026-08-21T15:05:30.428Z -- no editar a mano, se sobreescribe en cada publicacion._

## HU-01: Autenticación y Recuperación de Contraseña

### RF-01: RF-01: Endpoint de Inicio de Sesión (Login) (Funcional)

Implementar el endpoint POST /api/v1/auth/login para validar credenciales (email y contraseña) y retornar un token de autenticación (JWT/Session).

### RF-02: RF-02: Solicitud de Recuperación de Contraseña (Funcional)

Implementar el endpoint POST /api/v1/auth/forgot-password que procese la solicitud y envíe un correo con un token o enlace seguro de recuperación.

### RF-03: RF-03: Restablecimiento de Contraseña (Funcional)

Implementar el endpoint POST /api/v1/auth/reset-password para validar el token recibido y permitir ingresar una nueva contraseña.

### RNF-01: RNF-01: Seguridad en Almacenamiento y Expiración de Tokens (No funcional)

Almacenar contraseñas hasheadas (bcrypt/argon2) y fijar una expiración máxima de 15 minutos para los tokens de recuperación enviadas por mail.

## HU-02: Tablero Kanban para Gestión de Tareas

### RF-01: RF-04: API CRUD de Tareas (Funcional)

Crear los endpoints API para la creación, lectura, actualización y eliminación de tareas (título, descripción, asignado, fecha límite).

### RF-02: RF-05: Transición de Estados de Tareas (Funcional)

Endpoint o mecanismo para mover tareas entre las 4 columnas principales: To Do, Doing, Blocked y Done.

### RF-03: RF-06: Interfaz Visual del Tablero Kanban (Funcional)

Desarrollar el componente de interfaz gráfica con 4 columnas dinámicas para visualizar y arrastrar/mover las tarjetas de tareas.

### RNF-01: RNF-02: Desempeño y Respuesta de Interfaz (No funcional)

Garantizar que el movimiento de tarjetas y actualización en el servidor sea fluido y responda en menos de 300ms.
