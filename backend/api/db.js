const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Sesuaikan dengan user pgAdmin kamu
    host: 'localhost',
    database: 'uts_react',   // Wajib sesuai soal 
    password: 'ufl243ko32', // Isi password database kamu
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};