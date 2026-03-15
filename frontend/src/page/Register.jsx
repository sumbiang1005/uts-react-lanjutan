import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ gmail: '', username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:3000/api/register', form);
      alert("Registrasi Berhasil!");
      navigate('/login');
    } catch (err) {
      alert("Registrasi Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-black flex">
      {/* LEFT SIDE - Welcome Section (DI TENGAH) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-white p-12">
        <div className="max-w-lg text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>

          {/* Teks Selamat Datang (DI TENGAH) */}
          <h1 className="text-5xl font-bold mb-4">
            Bergabunglah
          </h1>
          <p className="text-xl text-red-200 mb-8">
            Buat akun baru dan mulai kelola data mahasiswa
          </p>

          {/* Garis Pemisah */}
          <div className="w-24 h-1 bg-red-400 mx-auto mb-8"></div>

          {/* Keuntungan Bergabung (di tengah) */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Akses ke semua fitur</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Update data real-time</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Gratis selamanya</span>
            </div>
          </div>

          {/* Testimoni */}
          <div className="mt-10">
            <div className="flex justify-center text-yellow-400 mb-2 text-xl">
              ★★★★★
            </div>
            <p className="text-sm text-red-300 italic">
              "Daftar hanya 1 menit! Proses cepat dan mudah"
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form Register (DI KANAN) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Card Register */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-red-800">
            
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-full">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-white mb-2">Daftar Akun</h2>
            <p className="text-center text-red-400 text-sm mb-8">Isi data dengan benar</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-red-400 text-sm font-medium mb-2">Gmail</label>
                <input
                  type="email"
                  value={form.gmail}
                  onChange={(e) => setForm({ ...form, gmail: e.target.value })}
                  placeholder="contoh@gmail.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-red-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-red-400 text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 bg-gray-800 border border-red-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-red-400 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 bg-gray-800 border border-red-900 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : 'DAFTAR'}
              </button>

              <p className="text-center text-gray-400 text-sm">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold hover:underline">
                  Login Sekarang
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;