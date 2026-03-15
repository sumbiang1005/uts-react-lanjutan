const jwt = require('jsonwebtoken');

// Gunakan Secret Key yang sama dengan yang ada di index.js
const SECRET_KEY = 'uts_react_lanjutan_secret';

const verifyToken = (req, res, next) => {
    // Sesuai persyaratan poin 2 & 38, data login/token diambil dari cookies
    const token = req.cookies.token;

    // Jika token tidak ada di cookies
    if (!token) {
        return res.status(401).json({ 
            message: "Akses ditolak, silakan login terlebih dahulu" 
        });
    }

    try {
        // Verifikasi token JWT
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        
        // Lanjut ke fungsi berikutnya (Controller CRUD)
        next(); 
    } catch (err) {
        // Jika token kedaluwarsa atau tidak valid
        res.status(400).json({ 
            message: "Token tidak valid atau sudah kedaluwarsa" 
        });
    }
};

module.exports = verifyToken;