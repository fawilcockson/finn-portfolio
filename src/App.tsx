import './App.css'

function App() {
  return (
    <main className="container">
      <h1>{import.meta.env.VITE_APP_NAME ?? "Finn's Portfolio"}</h1>
    </main>
  );
}

export default App
