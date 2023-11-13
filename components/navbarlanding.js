import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Navbarlanding.css";

import { Link } from 'react-router-dom'


export default function Navbarlanding() {
 
  
  const {authIsReady, user} = useAuthContext()
  const {logout} = useLogout();

    

  return (
    
    <nav className="navbar">
    <ul>
      {!user && <li className="logo">  
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/Contact">Contact Us</Link></li>
      </li>}

      {!user && <>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      </>}
      {user && <li>
        <button className="btn" onClick={logout}>Logout</button>
      </li>}
    </ul>
  </nav>
    
  );
}
