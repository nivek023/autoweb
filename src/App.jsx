import "./App.css";
import Navbar from "./components/header/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Search from "./components/main/AutoSuche";
import AutoDetail from "./components/main/AutoDetail";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<AutoDetail />}  />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
