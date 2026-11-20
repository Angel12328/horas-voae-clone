require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Las 3 variables siguientes SON OBLIGATORIAS. Crear un archivo
// .env.example en la raiz del proyecto antes de levantar el servidor.
if (!process.env.SUPABASE_URL) {
  throw new Error('Falta la variable de entorno SUPABASE_URL');
}
if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error('Falta la variable de entorno SUPABASE_ANON_KEY');
}

/**
 * Cliente Supabase. Se usa solo para operaciones de AUTENTICACION
 * (signInWithPassword / signUpWithPassword), no para consultas SQL
 * arbitrarias.
 */
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Login concreto: email + password -> user + session.
 * @param {string} email
 * @param {string} password
 * @returns {{ data: { user: object, session: object }, error: Error }|undefined }
 */
async function verifyLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

module.exports = { verifyLogin };
