
import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
//styles
import './Sidebar.css'



export default function Sidebar() {

  const {authIsReady, user} = useAuthContext()

  return (
   
  
    <div className="sidebar">
    <div className="sidebar-content">
      <div className="user">
        
        <p>Hey {user.displayName}</p>  
      </div>  
      <nav className="links">
        <ul>
          <li>
            <NavLink exact to="/dashboard">
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin">              
              <span>Admin</span>
            </NavLink>

          </li>
        </ul>
      </nav>
    </div>
  </div>
   
    
  );
}
