import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    activeCount: 0,
    inactiveCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/mahasiswa', {
        withCredentials: true
      });
      const data = res.data;
      setStats({
        totalMahasiswa: data.length,
        activeCount: data.filter(m => m.isActive).length,
        inactiveCount: data.filter(m => !m.isActive).length
      });
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section dengan Animasi */}
          <div className="text-center mb-12 animate-fade-in-up">
            {/* Icon besar */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-2xl shadow-red-900/50 animate-bounce-slow">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Selamat Datang
              </span>
              <br />
              <span className="text-white">di Portal Mahasiswa</span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Kelola data mahasiswa dengan <span className="text-red-400 font-semibold">cepat</span>, 
              <span className="text-red-400 font-semibold"> aman</span>, dan 
              <span className="text-red-400 font-semibold"> efisien</span>.
            </p>
          </div>

          {/* Statistics Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-in">
              {/* Total Mahasiswa */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/30 shadow-xl transform transition-all duration-300 hover:scale-105 hover:border-red-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Mahasiswa</p>
                    <p className="text-4xl font-bold text-white mt-2">{stats.totalMahasiswa}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/30 shadow-xl transform transition-all duration-300 hover:scale-105 hover:border-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active</p>
                    <p className="text-4xl font-bold text-green-400 mt-2">{stats.activeCount}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Inactive */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/30 shadow-xl transform transition-all duration-300 hover:scale-105 hover:border-red-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Inactive</p>
                    <p className="text-4xl font-bold text-red-400 mt-2">{stats.inactiveCount}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1,2,3].map(i => (
                <div key={i} className="bg-gray-800/50 p-6 rounded-xl animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Card Lihat Mahasiswa */}
            <Link to="/mahasiswa" 
              className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-red-900/30 shadow-xl transform transition-all duration-300 hover:scale-105 hover:border-red-600">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center">
                <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">Lihat Mahasiswa</h3>
                  <p className="text-gray-400 text-sm">Kelola data mahasiswa</p>
                </div>
              </div>
            </Link>

            {/* Card About */}
            <Link to="/about" 
              className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-red-900/30 shadow-xl transform transition-all duration-300 hover:scale-105 hover:border-red-600">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center">
                <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">Tentang Aplikasi</h3>
                  <p className="text-gray-400 text-sm">Info UTS React Lanjutan</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer Quote */}
          <div className="text-center mt-12 text-gray-500 italic">
            <p>"Aplikasi ini dibuat untuk memenuhi UTS React Lanjutan"</p>
            <p className="text-sm mt-2 text-gray-600">- Raja Tegar Albaihaqi -</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;