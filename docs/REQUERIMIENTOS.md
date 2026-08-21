# Requerimientos -- Dashboard

_Generado automaticamente el 2026-08-21T15:05:25.605Z -- no editar a mano, se sobreescribe en cada publicacion._

## HU-01: Autenticación y Recuperación de Contraseña

### RF-01: RF-01: Endpoint de Inicio de Sesión (Login) (Funcional)

Implementar el endpoint POST /api/v1/auth/login para validar credenciales (email y contraseña) y retornar un token de autenticación (JWT/Session).

### RF-02: RF-02: Solicitud de Recuperación de Contraseña (Funcional)

Implementar el endpoint POST /api/v1/auth/forgot-password que procese la solicitud y envíe un correo con un token o enlace seguro de recuperación.

### RF-03: RF-03: Restablecimiento de Contraseña (Funcional)

Implementar el endpoint POST /api/v1/auth/reset-password para validar el token recibido y permitir ingresar una nueva contraseña.

### RNF-01: RNF-01: Seguridad en Almacenamiento y Expiración de Tokens (No funcional)

Almacenar contraseñas hasheadas (bcrypt/argon2) y fijar una expiración máxima de 15 minutos para los tokens de recuperación enviadas por mail.
