import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/private/Dashboard";
import Survey from "@/pages/private/Survey";
import PrivateRoutes from '@/utils/private-routes.jsx'
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/*Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/survey" element={<Survey />} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
