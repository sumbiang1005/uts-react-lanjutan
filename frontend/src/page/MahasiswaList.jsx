import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MhsRow from '../components/MhsRow';

const MahasiswaList = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', nim: '', jurusan: '', ipk: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/mahasiswa', { withCredentials: true });
      setList(res.data);
    } catch (err) { 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/mahasiswa', form, { withCredentials: true });
      setForm({ name: '', nim: '', jurusan: '', ipk: '' });
      setShowForm(false);
      getData();
    } catch (err) {
      alert("Gagal menambah data");
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/mahasiswa/${id}/status`, 
        { isActive: !currentStatus }, 
        { withCredentials: true }
      );
      getData();
    } catch (err) {
      alert("Gagal update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:3000/api/mahasiswa/${id}`, { withCredentials: true });
        getData();
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header dengan animasi */}
          <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Manajemen Mahasiswa
              </h2>
              <p className="text-gray-400 mt-1">Kelola data mahasiswa dengan mudah</p>
            </div>
            
            {/* Tombol Tambah */}
            <button 
              onClick={() => setShowForm(!showForm)}
              className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50"
            >
              <span className="relative z-10 flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showForm ? "M19 9l-7 7-7-7" : "M12 4v16m8-8H4"} />
                </svg>
                {showForm ? 'Tutup Form' : 'Tambah Mahasiswa'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Form Tambah Mahasiswa dengan animasi slide */}
          {showForm && (
            <div className="mb-8 animate-slide-in">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/30 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Data Mahasiswa Baru
                </h3>
                
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">Nama</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama" 
                      className="w-full bg-gray-700 border border-red-900/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">NIM</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan NIM" 
                      className="w-full bg-gray-700 border border-red-900/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={form.nim} 
                      onChange={e => setForm({...form, nim: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">Jurusan</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan jurusan" 
                      className="w-full bg-gray-700 border border-red-900/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={form.jurusan} 
                      onChange={e => setForm({...form, jurusan: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">IPK</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      max="4" 
                      placeholder="0.00 - 4.00" 
                      className="w-full bg-gray-700 border border-red-900/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={form.ipk} 
                      onChange={e => setForm({...form, ipk: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1 flex items-end">
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white p-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Statistik ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-red-900/30">
              <p className="text-gray-400 text-sm">Total Mahasiswa</p>
              <p className="text-2xl font-bold text-white">{list.length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-green-900/30">
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">{list.filter(m => m.isActive).length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-red-900/30">
              <p className="text-gray-400 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-red-400">{list.filter(m => !m.isActive).length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-red-900/30">
              <p className="text-gray-400 text-sm">Rata-rata IPK</p>
              <p className="text-2xl font-bold text-red-400">
                {(list.reduce((acc, m) => acc + parseFloat(m.ipk), 0) / list.length || 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Tabel Mahasiswa */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-red-900/30 shadow-xl overflow-hidden">
            {loading ? (
              // Loading skeleton
              <div className="p-8 space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-red-900/50 to-black/50">
                    <tr>
                      <th className="p-4 text-left text-red-400 font-semibold">Nama</th>
                      <th className="p-4 text-left text-red-400 font-semibold">NIM</th>
                      <th className="p-4 text-left text-red-400 font-semibold">Jurusan</th>
                      <th className="p-4 text-left text-red-400 font-semibold">IPK</th>
                      <th className="p-4 text-left text-red-400 font-semibold">Status</th>
                      <th className="p-4 text-left text-red-400 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-900/20">
                    {list.length > 0 ? (
                      list.map(mhs => (
                        <MhsRow 
                          key={mhs.id} 
                          mhs={mhs} 
                          onUpdateStatus={handleUpdateStatus} 
                          onDelete={handleDelete} 
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-400">
                          <div className="flex flex-col items-center">
                            <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-lg">Belum ada data mahasiswa</p>
                            <p className="text-sm text-gray-500 mt-2">Klik tombol "Tambah Mahasiswa" untuk menambahkan data</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-4 text-right text-sm text-gray-500">
            <p>Total {list.length} data mahasiswa</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MahasiswaList;