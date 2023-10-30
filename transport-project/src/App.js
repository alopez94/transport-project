import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//page components

import Home from "./pages/Home/home";
import Dashboard from "./pages/dashboard/Dashboard";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

//components
import Navbarlanding from "./components/navbarlanding";

function App() {

  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      <Navbarlanding />
        <Routes>
          <Route path="/" element={ <Home /> } />
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
          <Route path="/signup" element={(
            !authIsReady ? <Navigate to="/home" /> : <Signup />            
            )} />
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
