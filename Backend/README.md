# Proyecto 13 - Backend Turismo

Instrucciones rápidas:
1. Copia los archivos a una carpeta `proyecto13-backend-turismo`.
2. Crear archivo `.env` usando `.env.example`.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev` (requiere nodemon) o `npm start`.

Rutas principales:
- Auth: POST /api/auth/register, POST /api/auth/login
- Tours: GET /api/tours, GET /api/tours/:id, POST/PUT/DELETE /api/tours (protegidas)
- Reservations: POST /api/reservations, GET /api/reservations (protegidas)

Consejos para integrar con tu frontend (topología parecida al backend de camisetas):
- Mantén las mismas variables de entorno (PORT, MONGODB_URI, JWT_SECRET) si tu otro proyecto las usa.
- Para el front, en el proceso de reservar: primero autenticación -> obtener token -> POST /api/reservations con header `Authorization: Bearer <token>`.

Si quieres, puedo:
- Generar seeds (datos de ejemplo).
- Añadir subida de imágenes (Cloudinary / S3).
- Ajustar nombres de variables exactamente igual al proyecto de la camiseta si me das un fragmento del `server.js` o `.env` original.
