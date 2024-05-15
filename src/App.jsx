import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/private/Dashboard";
import Survey from "@/pages/private/Survey";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="survey" element={<Survey />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
