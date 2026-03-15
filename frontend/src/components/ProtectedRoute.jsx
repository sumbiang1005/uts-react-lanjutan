import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  // Poin 38: Mengecek keberadaan token di cookies
  const token = Cookies.get('token');

  if (!token) {
    // Jika tidak ada token, arahkan paksa ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, izinkan akses ke halaman tujuan
  return <Outlet />;
};

export default ProtectedRoute;