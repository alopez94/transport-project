import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//page components

import Home from "./pages/Home/home";


//components
import Navbarlanding from "./components/navbarlanding"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbarlanding />
        <Routes>
        <Route path="/home" element={<Home/>} />  
          
        </Routes> 
        
      </BrowserRouter>
    </div>
  );
}

export default App;
