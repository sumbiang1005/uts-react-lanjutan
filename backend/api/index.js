const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); 
const verifyToken = require('./middleware/outh'); 

const app = express();
const SECRET_KEY = 'uts_react_lanjutan_secret';

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// --- REGISTER ---
app.post('/api/register', async (req, res) => {
    const { gmail, username, password } = req.body;
    console.log("📝 Register attempt:", { gmail, username });
    
    try {
        // Cek apakah email sudah terdaftar
        const cekUser = await db.query("SELECT * FROM users WHERE gmail = $1 OR username = $2", [gmail, username]);
        if (cekUser.rows.length > 0) {
            return res.status(400).json({ error: "Email atau username sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (gmail, username, password) VALUES ($1, $2, $3)", 
            [gmail, username, hashedPassword]
        );
        
        console.log("✅ Register berhasil:", username);
        res.status(201).json({ message: "Berhasil Daftar" });
    } catch (err) { 
        console.error("❌ REGISTER ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// --- LOGIN ---
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("📝 Login attempt:", username);
    
    try {
        const user = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User tidak ditemukan" });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password);
        if (!valid) {
            return res.status(400).json({ message: "Password salah" });
        }

        const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { 
            httpOnly: false, 
            path: '/', 
            maxAge: 3600000,
            sameSite: 'lax'
        });
        
        console.log("✅ Login berhasil:", username);
        res.json({ message: "Login berhasil" });
    } catch (err) { 
        console.error("❌ LOGIN ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// ============================================
// ============ CRUD MAHASISWA ================
// ============================================

// --- GET ALL MAHASISWA (READ) ---
app.get('/api/mahasiswa', verifyToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM mhs_tb ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("❌ GET MHS ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- GET MAHASISWA BY ID (READ DETAIL) ---
app.get('/api/mahasiswa/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM mhs_tb WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Data mahasiswa tidak ditemukan" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ GET MHS BY ID ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- CREATE MAHASISWA (TAMBAH) ---
app.post('/api/mahasiswa', verifyToken, async (req, res) => {
    const { name, nim, jurusan, ipk } = req.body;
    
    // Validasi input
    if (!name || !nim || !jurusan || !ipk) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }
    
    try {
        const result = await db.query(
            'INSERT INTO mhs_tb (name, nim, jurusan, ipk, "isActive") VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [name, nim, jurusan, ipk, true]
        );
        console.log("✅ Mahasiswa ditambahkan:", result.rows[0]);
        res.status(201).json({ 
            message: "Mahasiswa Ditambahkan", 
            data: result.rows[0] 
        });
    } catch (err) { 
        console.error("❌ ADD MHS ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// --- UPDATE MAHASISWA (EDIT) ---
app.put('/api/mahasiswa/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, nim, jurusan, ipk } = req.body;
    
    console.log("📝 Update data attempt:", { id, name, nim, jurusan, ipk });
    
    // Validasi input
    if (!name || !nim || !jurusan || !ipk) {
        return res.status(400).json({ error: "Semua field harus diisi" });
    }
    
    try {
        // Cek apakah data ada
        const cekData = await db.query('SELECT * FROM mhs_tb WHERE id = $1', [id]);
        
        if (cekData.rows.length === 0) {
            return res.status(404).json({ error: "Data mahasiswa tidak ditemukan" });
        }
        
        // Update data
        const result = await db.query(
            'UPDATE mhs_tb SET name = $1, nim = $2, jurusan = $3, ipk = $4 WHERE id = $5 RETURNING *',
            [name, nim, jurusan, ipk, id]
        );
        
        console.log("✅ Update berhasil:", result.rows[0]);
        res.json({ 
            message: "Data mahasiswa berhasil diupdate", 
            data: result.rows[0] 
        });
        
    } catch (err) { 
        console.error("❌ UPDATE DATA ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// --- UPDATE STATUS MAHASISWA ---
app.patch('/api/mahasiswa/:id/status', verifyToken, async (req, res) => {
    const { isActive } = req.body;
    const { id } = req.params;
    
    console.log("📝 Update status attempt:", { id, isActive });
    
    try {
        // Cek apakah data ada
        const cekData = await db.query('SELECT * FROM mhs_tb WHERE id = $1', [id]);
        
        if (cekData.rows.length === 0) {
            return res.status(404).json({ error: "Data mahasiswa tidak ditemukan" });
        }
        
        // Update status
        const result = await db.query(
            'UPDATE mhs_tb SET "isActive" = $1 WHERE id = $2 RETURNING *', 
            [isActive, id]
        );
        
        console.log("✅ Status berhasil diupdate:", result.rows[0]);
        res.json({ 
            message: "Status Diperbarui", 
            data: result.rows[0] 
        });
        
    } catch (err) { 
        console.error("❌ UPDATE STATUS ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// --- DELETE MAHASISWA (HAPUS) ---
app.delete('/api/mahasiswa/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    
    try {
        // Cek apakah data ada
        const cekData = await db.query('SELECT * FROM mhs_tb WHERE id = $1', [id]);
        
        if (cekData.rows.length === 0) {
            return res.status(404).json({ error: "Data mahasiswa tidak ditemukan" });
        }
        
        // Hapus data
        await db.query('DELETE FROM mhs_tb WHERE id = $1', [id]);
        
        console.log("✅ Data mahasiswa dengan ID", id, "berhasil dihapus");
        res.json({ message: "Berhasil Hapus" });
        
    } catch (err) { 
        console.error("❌ DELETE MHS ERROR:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server UTS Jalan di port ${PORT}`);
    console.log(`📡 API tersedia di http://localhost:${PORT}`);
    console.log(`📌 Endpoint yang tersedia:`);
    console.log(`   - POST   /api/register`);
    console.log(`   - POST   /api/login`);
    console.log(`   - GET    /api/mahasiswa`);
    console.log(`   - GET    /api/mahasiswa/:id`);
    console.log(`   - POST   /api/mahasiswa`);
    console.log(`   - PUT    /api/mahasiswa/:id`);
    console.log(`   - PATCH  /api/mahasiswa/:id/status`);
    console.log(`   - DELETE /api/mahasiswa/:id`);
});