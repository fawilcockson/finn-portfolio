import { Link, Route, Routes } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard.tsx";
import './App.css'

function App() {
  return (
    <div className="page">
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <a href={import.meta.env.VITE_FORM_URL} target="_blank" rel="noreferrer">
          Take the quiz
        </a>
      </div>

      <div className="box">
        <Routes>
          <Route path="/" element={<h1>Finn's Portfolio</h1>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );

}

export default App
