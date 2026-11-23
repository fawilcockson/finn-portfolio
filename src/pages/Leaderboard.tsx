import { useEffect, useState } from "react";
import Papa from "papaparse";
import LeaderboardPodium, {
  type PodiumEntry,
} from "../components/LeaderboardPodium";

interface WeekColumn {
  label: string;
  index: number;
  week: number;
}

interface Entry extends PodiumEntry {
  weeklyScores: (number | null)[];
  place: number;
}

function parseScore(value: string | undefined): number | null {
  if (!value?.trim()) return null;

  const score = Number.parseFloat(value.trim());
  return Number.isFinite(score) ? score : null;
}

function Leaderboard() {
  const csvUrl = import.meta.env.VITE_SHEET_CSV_URL;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [weekColumns, setWeekColumns] = useState<WeekColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!csvUrl) return;

    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Couldn't load the sheet");
        return res.text();
      })
      .then((csv) => {
        const rows = Papa.parse<string[]>(csv, {
          skipEmptyLines: true,
        }).data;
        const [headerRow, ...dataRows] = rows;

        if (!headerRow) {
          setEntries([]);
          setWeekColumns([]);
          return;
        }

        const headers = headerRow.map((header) => header.trim());
        const weekColumns = headers
          .map((label, index) => {
            const match = label.match(/^week\s*(\d+)\b/i);
            return match
              ? { label, index, week: Number.parseInt(match[1], 10) }
              : null;
          })
          .filter((column): column is WeekColumn => column !== null)
          .sort((a, b) => a.week - b.week);
        const nameIndex = headers.findIndex((header) =>
          /^name$/i.test(header),
        );
        const totalIndex = headers.findIndex((header) =>
          /^total(?:\s*(?:score|points))?$/i.test(header),
        );
        const legacyScoreIndex =
          weekColumns.length === 0
            ? headers.findIndex((header) => /^score$/i.test(header))
            : -1;

        const parsed = dataRows
          .map((row): Omit<Entry, "place"> | null => {
            const weeklyScores = weekColumns.map((column) =>
              parseScore(row[column.index]),
            );
            const enteredTotal = parseScore(
              totalIndex >= 0
                ? row[totalIndex]
                : legacyScoreIndex >= 0
                  ? row[legacyScoreIndex]
                  : undefined,
            );
            const totalScore =
              enteredTotal ??
              (weeklyScores.some((score) => score !== null)
                ? weeklyScores.reduce<number>(
                    (total, score) => total + (score ?? 0),
                    0,
                  )
                : null);

            if (totalScore === null) return null;

            return {
              name: row[nameIndex >= 0 ? nameIndex : 0]?.trim() || "Anonymous",
              weeklyScores,
              totalScore,
            };
          })
          .filter(
            (entry): entry is Omit<Entry, "place"> => entry !== null,
          )
          .sort((a, b) => b.totalScore - a.totalScore);

        let place = 0;
        let previousScore: number | undefined;
        const ranked = parsed.map((entry) => {
          if (entry.totalScore !== previousScore) {
            place += 1;
            previousScore = entry.totalScore;
          }

          return { ...entry, place };
        });

        setWeekColumns(weekColumns);
        setEntries(ranked);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [csvUrl]);

  return (
    <main className="leaderboard">
      <h1>Leaderboard</h1>
      {loading && csvUrl && <p>Loading scores...</p>}
      {(!csvUrl || error) && (
        <p className="error">
          {error || "The leaderboard spreadsheet URL is not configured."}
        </p>
      )}
      {!loading && csvUrl && !error && entries.length === 0 && (
        <p>No scores yet!</p>
      )}
      {!loading && csvUrl && !error && entries.length > 0 && (
        <>
          <LeaderboardPodium entries={entries} />
          <div className="leaderboard-table-wrap">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th scope="col">Place</th>
                  <th scope="col">Name</th>
                  {weekColumns.map((column) => (
                    <th scope="col" key={column.index}>
                      {column.label}
                    </th>
                  ))}
                  {weekColumns.length === 0 && (
                    <th scope="col">Score</th>
                  )}
                  <th scope="col">Total score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={`${entry.name}-${index}`}>
                    <td>{entry.place}</td>
                    <th scope="row">{entry.name}</th>
                    {weekColumns.length > 0
                      ? entry.weeklyScores.map((score, weekIndex) => (
                          <td key={weekColumns[weekIndex].index}>
                            {score ?? "—"}
                          </td>
                        ))
                      : <td>{entry.totalScore}</td>}
                    <td className="total-score">{entry.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

export default Leaderboard;
