require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { verifyLogin } = require('./src/supabaseClient');

const app = express();
const PORT = process.env.PORT || 4000;

// Habilita CORS para que el frontend (localhost:3000) pueda llamar al API
// sin restricciones de origen. Solo se aplica en desarrollo; en prod se
// configura con un reverse proxy.
app.use(cors());
app.use(express.json({ limit: '10kb' }));

/**
 * Unico endpoint de la API.
 * POST /login { email, password } -> { success, user, session }
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

app.listen(PORT, () => {
  console.log(`[backend] API listen on http://localhost:${PORT}`);
});
