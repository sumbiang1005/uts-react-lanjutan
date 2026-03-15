import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import MahasiswaList from './page/MahasiswaList';
import Contact from './page/Contact';
import About from './page/About';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Bebas Akses */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Poin 22: Halaman Terproteksi (Wajib Login)  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/mahasiswa" element={<MahasiswaList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;