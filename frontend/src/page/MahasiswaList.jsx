import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MhsRow from '../components/MhsRow';

const MahasiswaList = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', nim: '', jurusan: '', ipk: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMhs, setSelectedMhs] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  
  // State untuk mode edit
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', name: '', nim: '', jurusan: '', ipk: '' });

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

  // --- CREATE (Tambah) ---
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

  // --- UPDATE (Edit) ---
  const handleEdit = (mhs) => {
    setEditMode(true);
    setEditForm({
      id: mhs.id,
      name: mhs.name,
      nim: mhs.nim,
      jurusan: mhs.jurusan,
      ipk: mhs.ipk
    });
    setShowDetail(false); // Tutup modal detail
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Asumsi ada endpoint PUT /api/mahasiswa/:id
      await axios.put(`http://localhost:3000/api/mahasiswa/${editForm.id}`, editForm, { withCredentials: true });
      setEditMode(false);
      setEditForm({ id: '', name: '', nim: '', jurusan: '', ipk: '' });
      getData();
      alert("Data berhasil diupdate!");
    } catch (err) {
      alert("Gagal update data");
    }
  };

  // --- UPDATE STATUS ---
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/mahasiswa/${id}/status`, 
        { isActive: !currentStatus }, 
        { withCredentials: true }
      );
      getData();
      if (selectedMhs && selectedMhs.id === id) {
        setSelectedMhs({...selectedMhs, isActive: !currentStatus});
      }
    } catch (err) {
      alert("Gagal update status");
    }
  };

  // --- DELETE ---
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:3000/api/mahasiswa/${id}`, { withCredentials: true });
        getData();
        if (selectedMhs && selectedMhs.id === id) {
          setShowDetail(false);
          setSelectedMhs(null);
        }
      } catch (err) {
        alert("Gagal menghapus data");
      }
    }
  };

  const handleDetail = (mhs) => {
    setSelectedMhs(mhs);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedMhs(null);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditForm({ id: '', name: '', nim: '', jurusan: '', ipk: '' });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Manajemen Mahasiswa
              </h2>
              <p className="text-gray-400 mt-1">Kelola data mahasiswa dengan mudah</p>
            </div>
            
            {/* Tombol Tambah */}
            <button 
              onClick={() => {
                setShowForm(!showForm);
                setEditMode(false); // Tutup edit mode jika buka form
              }}
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

          {/* FORM TAMBAH MAHASISWA */}
          {showForm && !editMode && (
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

          {/* FORM EDIT MAHASISWA */}
          {editMode && (
            <div className="mb-8 animate-slide-in">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-600/50 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Data Mahasiswa
                </h3>
                
                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">Nama</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama" 
                      className="w-full bg-gray-700 border border-yellow-600/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">NIM</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan NIM" 
                      className="w-full bg-gray-700 border border-yellow-600/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={editForm.nim} 
                      onChange={e => setEditForm({...editForm, nim: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <label className="block text-red-400 text-sm mb-1">Jurusan</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan jurusan" 
                      className="w-full bg-gray-700 border border-yellow-600/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={editForm.jurusan} 
                      onChange={e => setEditForm({...editForm, jurusan: e.target.value})} 
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
                      className="w-full bg-gray-700 border border-yellow-600/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 placeholder-gray-400" 
                      value={editForm.ipk} 
                      onChange={e => setEditForm({...editForm, ipk: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="md:col-span-1 flex items-end space-x-2">
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-900/50"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Update
                      </span>
                    </button>
                    <button 
                      type="button"
                      onClick={cancelEdit}
                      className="w-full bg-gray-700 text-white p-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Batal
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

          {/* Tabel Mahasiswa (HANYA NAMA) */}
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
                      <th className="p-4 text-left text-red-400 font-semibold">No</th>
                      <th className="p-4 text-left text-red-400 font-semibold">Nama Mahasiswa</th>
                      <th className="p-4 text-center text-red-400 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-900/20">
                    {list.length > 0 ? (
                      list.map((mhs, index) => (
                        <tr key={mhs.id} className="hover:bg-red-900/10 transition-colors duration-200">
                          <td className="p-4 text-gray-300">{index + 1}</td>
                          <td className="p-4">
                            <span className="text-white font-medium">{mhs.name}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              {/* Tombol Detail */}
                              <button
                                onClick={() => handleDetail(mhs)}
                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Detail
                              </button>

                              {/* Tombol Edit */}
                              <button
                                onClick={() => handleEdit(mhs)}
                                className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition duration-200 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>

                              {/* Tombol Tukar Status */}
                              <button
                                onClick={() => handleUpdateStatus(mhs.id, mhs.isActive)}
                                className={`px-3 py-1.5 text-sm rounded-lg transition duration-200 flex items-center ${
                                  mhs.isActive 
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {mhs.isActive ? 'Nonaktif' : 'Aktif'}
                              </button>

                              {/* Tombol Hapus */}
                              <button
                                onClick={() => handleDelete(mhs.id)}
                                className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-8 text-center text-gray-400">
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

      {/* MODAL DETAIL MAHASISWA */}
      {showDetail && selectedMhs && !editMode && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-red-800 shadow-2xl max-w-md w-full animate-slide-in">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-6 border-b border-red-900/30">
              <h3 className="text-xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Detail Mahasiswa
              </h3>
              <button
                onClick={closeDetail}
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 space-y-4">
              {/* Foto/Inisial */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">
                    {selectedMhs.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-red-400">Nama</p>
                  <p className="text-sm text-white font-semibold">{selectedMhs.name}</p>
                </div>
                <div className="col-span-1 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-red-400">NIM</p>
                  <p className="text-sm text-white font-semibold">{selectedMhs.nim}</p>
                </div>
                <div className="col-span-1 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-red-400">Jurusan</p>
                  <p className="text-sm text-white font-semibold">{selectedMhs.jurusan}</p>
                </div>
                <div className="col-span-1 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-red-400">IPK</p>
                  <p className="text-sm text-white font-semibold">{selectedMhs.ipk}</p>
                </div>
                <div className="col-span-2 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-red-400">Status</p>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${selectedMhs.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <p className="text-sm text-white font-semibold">
                      {selectedMhs.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi di Modal */}
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => {
                    handleEdit(selectedMhs);
                  }}
                  className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition duration-200"
                >
                  Edit Data
                </button>
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedMhs.id, selectedMhs.isActive);
                  }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition duration-200 ${
                    selectedMhs.isActive 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {selectedMhs.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedMhs.id);
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-200"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MahasiswaList;