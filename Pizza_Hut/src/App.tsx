import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MainArea from "./Components/MainArea";
import Menu from "./Pages/Menu";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Pepperoni from "./Pages/Categories/Pepperoni";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} /> {/* Redirect unknown routes */}
          <Route path="/contact" element={<Contact/>} /> {/* Redirect unknown routes */}
          <Route path="/Pepperoni" element={<Pepperoni/>} /> {/* Redirect unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
