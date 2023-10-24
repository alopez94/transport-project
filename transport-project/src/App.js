import "./App.css";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

//page components

import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

//components
import Navbarlanding from "./components/Navbarlanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
