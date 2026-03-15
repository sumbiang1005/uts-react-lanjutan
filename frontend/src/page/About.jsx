import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Card dengan animasi */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-900/30 p-8 animate-fade-in-up">
            
            {/* Header dengan icon */}
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-lg shadow-red-900/50 mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Tentang Website
              </h2>
            </div>
            
            {/* Garis pemisah merah */}
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full mb-6"></div>
            
            {/* Konten */}
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                Aplikasi ini dibuat untuk memenuhi syarat UTS mata kuliah React Lanjutan.
              </p>
              
              {/* Info tambahan biar lebih hidup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-semibold text-red-400">Teknologi</h3>
                  </div>
                  <p className="text-sm text-gray-400">React.js, Tailwind CSS, Node.js, PostgreSQL</p>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-semibold text-red-400">Fitur</h3>
                  </div>
                  <p className="text-sm text-gray-400">Auth, CRUD Mahasiswa, Protected Routes</p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-red-900/30 text-center">
                <p className="text-sm text-gray-500">
                  Dibuat dengan ❤️ oleh <span className="text-red-400 font-semibold">Tegar</span>
                </p>
                <p className="text-xs text-gray-600 mt-2">© 2024 UTS React Lanjutan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;