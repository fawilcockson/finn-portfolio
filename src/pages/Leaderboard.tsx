import { useEffect, useState } from "react";
import Papa from "papaparse";

interface Entry {
  name: string;
  score: number;
}

function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Couldn't load the sheet");
        return res.text();
      })
      .then((csv) => {
        // Row 1 is the header, so skip it. Column 0 = name, column 1 = score.
        const rows = Papa.parse<string[]>(csv, { skipEmptyLines: true }).data.slice(1);

        const parsed = rows
          .map((r) => ({
            name: r[0]?.trim() || "Anonymous",
            score: parseFloat(r[1]), // handles "8 / 10" -> 8
          }))
          .filter((e) => !Number.isNaN(e.score))
          .sort((a, b) => b.score - a.score);

        setEntries(parsed);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (entries.length === 0) return <p>No scores yet!</p>;

  return (
    <div>
      <h1>Leaderboard</h1>
      {entries.map((e, i) => (
        <div key={i} className={`row ${i < 3 ? "top" : ""}`}>
          <span>{i + 1}.</span>
          <span className="name">{e.name}</span>
          <span>{e.score}</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
