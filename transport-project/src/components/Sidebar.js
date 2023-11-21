
import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { projectAuthentication, projectFirestore } from '../firebase/config'
//styles
import './Sidebar.css'
import { useState } from "react"



export default function Sidebar() {

  const {authIsReady, user} = useAuthContext()

  const [isAdmin, setIsAdmin] = useState(false)
  const [isDriver, setIsDriver] = useState(false)

  const userID = projectAuthentication.currentUser.uid;
  const userDoc = projectFirestore.collection('users').doc(userID)

 userDoc.get().then((doc) =>{
  if(doc.exists){
    const userRole = doc.data().isAdmin;
    const isDriver = doc.data().isDriver;
    console.log('userRole :>> ', userRole);
    setIsAdmin(userRole)
    setIsDriver(isDriver)
  }
  else{
    console.log('No User');
  }
 })


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
            <NavLink exact to="/mytrips">
              <span>Mis viajes</span>
            </NavLink>
          </li>
          <li>
            {isDriver && <NavLink exact to="/myvehicles">
              <span>Mis vehiculos</span>
            </NavLink>}
          </li>
          <li>
            <NavLink exact to="/tracking">
              <span>Tracking</span>
            </NavLink>
          </li>
          <li>
            {isAdmin && <NavLink to="/admin">              
              <span>Admin</span>
            </NavLink>}

          </li>
        </ul>
      </nav>
    </div>
  </div>
   
    
  );
}
