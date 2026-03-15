import Navbar from '../components/Navbar';

const Contact = () => {
  // Hitung usia
  const calculateAge = () => {
    const birthDate = new Date('2005-09-24');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Card Utama dengan animasi */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-900/30 p-8 animate-fade-in-up">
            
            {/* Header dengan icon */}
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-lg shadow-red-900/50 mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Contact Person
              </h2>
            </div>
            
            {/* Garis pemisah merah */}
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full mb-6"></div>
            
            {/* Foto Profile dengan inisial */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl text-white font-bold">RT</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
              </div>
            </div>
            
            {/* Info Cards */}
            <div className="space-y-4">
              {/* Nama */}
              <div className="group bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-red-900/30">
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-400 font-semibold">Nama Lengkap</p>
                    <p className="text-white text-lg font-bold">Raja Tegar Albaihaqi</p>
                  </div>
                </div>
              </div>
              
              {/* TTL */}
              <div className="group bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-red-900/30">
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-400 font-semibold">Tempat, Tanggal Lahir</p>
                    <p className="text-white text-lg">24 September 2005</p>
                    <p className="text-gray-400 text-sm">Usia: {calculateAge()} Tahun</p>
                  </div>
                </div>
              </div>
              
              {/* Pelatihan */}
              <div className="group bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-red-900/30">
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-400 font-semibold">Pelatihan</p>
                    <p className="text-white text-lg">React Lanjutan</p>
                  </div>
                </div>
              </div>
              
              {/* Instruktur - DIUBAH JADI IKMAL */}
              <div className="group bg-black/30 p-4 rounded-lg border border-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-red-900/30">
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-400 font-semibold">Instruktur</p>
                    <p className="text-white text-lg">Ikmal</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  WhatsApp
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            
            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-red-900/30 text-center">
              <p className="text-gray-400">
                Hubungi saya untuk informasi lebih lanjut
              </p>
              <p className="text-xs text-gray-600 mt-2">
                © 2024 Raja Tegar Albaihaqi - UTS React Lanjutan
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;