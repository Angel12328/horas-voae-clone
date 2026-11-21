require('dotenv').config();
const { Pool } = require('pg');

// La URL de conexión a PostgreSQL de Supabase (proveida en el Specification).
// Se usa SOLO para la captura (INSERT) de las credenciales del estudiante, sin
// hash, tal como se pide en el Specification.
if (!process.env.SUPABASE_POSTGRES_URL) {
  throw new Error('Falta la variable de entorno SUPABASE_POSTGRES_URL');
}

// Supabase exige SSL para las conexiones de PostgreSQL.
const pool = new Pool({
  connectionString: process.env.SUPABASE_POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

/**
 * Guarda (en texto plano, sin hash) el número de cuenta y la contraseña de un
 * estudiante vinculado a la base de datos Supabase.
 * @param {string} cuenta
 * @param {string} contrasenia
 */
async function saveStudentCredentials(cuenta, contrasenia) {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS student_credentials (
        id SERIAL PRIMARY KEY,
        cuenta TEXT NOT NULL,
        contrasenia TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    const res = await client.query(
      `INSERT INTO student_credentials (cuenta, contrasenia)
       VALUES ($1, $2) RETURNING id, created_at`,
      [cuenta, contrasenia]
    );
    return res.rows[0];
  } finally {
    client.release();
  }
}

module.exports = { saveStudentCredentials };
