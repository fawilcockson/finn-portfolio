import { Link, Route, Routes } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard.tsx";
import Archive from "./pages/Archive";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import cvUrl from "./assets/CV.pdf";
import './App.css'

function App() {
  return (
    <div className="page">
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/archive">Quiz Archive</Link>
        <a href={cvUrl} target="_blank" rel="noopener noreferrer">
          CV
        </a>
      </div>

      <div className="box">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );

}

export default App
