import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import TailorTrip from './pages/TailorTrip';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function ProtectedAdmin({children}){ return localStorage.getItem('ste_admin_token') ? children : <Navigate to="/admin" replace/>; }

export default function App(){
  return <Routes>
    <Route element={<SiteLayout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/tours" element={<Tours/>}/>
      <Route path="/tours/:slug" element={<TourDetails/>}/>
      <Route path="/category/:category" element={<Tours/>}/>
      <Route path="/tailor-made" element={<TailorTrip/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/destinations" element={<Destinations/>}/>
    </Route>
    <Route path="/admin" element={<AdminLogin/>}/>
    <Route path="/admin/dashboard" element={<ProtectedAdmin><AdminDashboard/></ProtectedAdmin>}/>
  </Routes>;
}
