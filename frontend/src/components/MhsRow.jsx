const MhsRow = ({ mhs, onUpdateStatus, onDelete }) => {
  return (
    <tr className="border-b border-red-900/20 hover:bg-gradient-to-r hover:from-red-900/10 hover:to-black/20 transition-all duration-300">
      <td className="p-4 font-medium text-gray-300">{mhs.name}</td>
      <td className="p-4 text-gray-300">{mhs.nim}</td>
      <td className="p-4 text-gray-300">{mhs.jurusan}</td>
      <td className="p-4 font-bold text-red-400">{mhs.ipk}</td>
      <td className="p-4">
        {/* Status dengan desain lebih menarik */}
        <span className={`
          inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg
          transform transition-all duration-300 hover:scale-105
          ${mhs.isActive 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-900/50' 
            : 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-red-900/50'
          }
        `}>
          {/* Indikator titik */}
          <span className={`
            w-2 h-2 rounded-full mr-2 animate-pulse
            ${mhs.isActive ? 'bg-white' : 'bg-white'}
          `}></span>
          {mhs.isActive ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center space-x-3">
          {/* Tombol Tukar Status */}
          <button 
            onClick={() => onUpdateStatus(mhs.id, mhs.isActive)}
            className="group relative overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/50"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Tukar Status
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Tombol Hapus */}
          <button 
            onClick={() => onDelete(mhs.id)}
            className="group relative overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MhsRow;