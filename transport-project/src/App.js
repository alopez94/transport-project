import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//page components

import Home from "./pages/home";

//components


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
         
        </nav>
        <Routes>
        <Route exact path="/" element={<Home/>} />      
        </Routes> 
        
      </BrowserRouter>
    </div>
  );
}

export default App;
