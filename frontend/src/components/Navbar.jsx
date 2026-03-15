import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk efek navbar berubah
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled 
        ? 'bg-gradient-to-r from-gray-900 to-black py-2 shadow-2xl shadow-red-900/30' 
        : 'bg-gradient-to-r from-red-700 to-red-900 py-4'
      }
    `}>
      {/* Efek garis bawah merah */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* Logo/Brand dengan animasi */}
          <Link 
            to="/" 
            className="group relative overflow-hidden"
          >
            <h1 className={`
              text-xl font-bold transform transition-all duration-300
              ${isScrolled ? 'text-white' : 'text-white'}
              group-hover:scale-105
            `}>
              <span className="relative">
                UTS React
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
              </span>
              <span className="text-red-300 ml-1">Tegar</span>
            </h1>
          </Link>

          {/* Menu Links */}
          <div className="flex items-center space-x-1">
            {/* Home Link */}
            <Link 
              to="/" 
              className="relative px-4 py-2 text-white hover:text-red-300 transition-colors duration-300 group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            </Link>

            {/* Mahasiswa Link */}
            <Link 
              to="/mahasiswa" 
              className="relative px-4 py-2 text-white hover:text-red-300 transition-colors duration-300 group"
            >
              <span className="relative z-10">Mahasiswa</span>
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            </Link>

            {/* About Link */}
            <Link 
              to="/about" 
              className="relative px-4 py-2 text-white hover:text-red-300 transition-colors duration-300 group"
            >
              <span className="relative z-10">About</span>
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            </Link>

            {/* Contact Link */}
            <Link 
              to="/contact" 
              className="relative px-4 py-2 text-white hover:text-red-300 transition-colors duration-300 group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            </Link>

            {/* Tombol Logout dengan desain khusus */}
            <button 
              onClick={handleLogout}
              className="
                relative ml-4 px-6 py-2 
                bg-gradient-to-r from-red-600 to-red-800 
                text-white rounded-lg font-semibold
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:shadow-red-900/50
                active:scale-95
                overflow-hidden group
              "
            >
              {/* Efek background saat hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ikon Logout */}
              <span className="relative z-10 flex items-center">
                <svg 
                  className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Efek glow di sisi kanan kiri (opsional) */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-red-500/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-red-500/20 to-transparent pointer-events-none"></div>
    </nav>
  );
};

export default Navbar;