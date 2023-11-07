import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//page components

import Home from "./pages/Home/home";
import Dashboard from "./pages/dashboard/Dashboard";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";

//components
import Navbarlanding from "./components/Navbarlanding";
import Sidebar from "./components/Sidebar";


function App() {

  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      {user && <Sidebar />}

      <div className="container">
      <Navbarlanding />
        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route path="/dashboard" element={(
            !user ? <Navigate to="/login" /> : <Dashboard />            
            )} />
          <Route path="/about" element={<About />            
            } />
          <Route path="/contact" element={<Contact />            
            } />
          <Route path="/login" element={(
            user ? <Navigate to="/dashboard" /> : <Login />            
            )} />
            <Route path="/admin" element={(
            !user ? <Navigate to="/login" /> : <Admin />            
            )} />
          <Route path="/signup" element={(
            !authIsReady || user ? <Navigate to="/dashboard" /> : <Signup />            
            )} />
        </Routes>
        </div>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
