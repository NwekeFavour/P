import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Aos from 'aos';
import "aos/dist/aos.css";
import Apply from './pages/apply';
import Login from './pages/auth/login/login';
import Register from './pages/auth/signup/register';
import Int from './pages/int';
import ScrollToTop from './components/scrolltoTop';
import Premium from './pages/premium';
import Contact from './pages/contact';
import Users from './pages/superAdmin/users';
import Talent from './pages/talent';
import AdminPrem from './pages/superAdmin/prem';
import JoinWorkspace from './pages/join';
import SAdminDashboard from './pages/superAdmin/dash';
import Cohorts from './pages/superAdmin/cohorts';
import ProtectedRoute from './protectRoute';
import Error from './components/error';
import AdminDashboard from './pages/admin/admin';
import { Toaster } from 'sonner';
import CohortManagement from './pages/admin/cohorts';
import ApplicationsDashboard from './pages/admin/application'
import PaymentCallback from './components/paymentcallback';
import VerifyCertificate from './pages/verifycertificate';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease-in-out" });

    // ✅ Restore user from localStorage
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("user");

    if (token && role) {
      setUser(role.replace(/"/g, ''));
    } else{
      setUser(null)
    }

    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Toaster richColors closeButton position='top-right' />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/knownly/internships" element={<Apply />} />
        <Route path="/internship" element={<Int />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/knownly/talents" element={<Talent />} />
        <Route path="/internships/join" element={<JoinWorkspace />} />
        <Route path="/unauthorized" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path='/payment/callback' element={<PaymentCallback/>}/>
        <Route path="/verify/:certificateId" element={<VerifyCertificate />} />

        {/* Protected Admin routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
          <Route path="/admin/cohorts" element={<CohortManagement />} />
        </Route>
        <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} /> }>
          <Route path='/admin/applications' element={<ApplicationsDashboard/>}/>
        </Route>

        {/* Protected Super Admin routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={["super-admin"]} />}>
          <Route path="/dashboard" element={<SAdminDashboard />} />
          <Route path="/dashboard/premium" element={<AdminPrem />} />
          <Route path="/dashboard/cohorts" element={<Cohorts />} />
          <Route path="/dashboard/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
