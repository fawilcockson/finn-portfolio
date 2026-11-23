  export interface PodiumEntry {
  name: string;
  totalScore: number;
}

interface LeaderboardPodiumProps {
  entries: PodiumEntry[];
}

function LeaderboardPodium({ entries }: LeaderboardPodiumProps) {
  const places: { place: number; entries: PodiumEntry[]; score: number }[] = [];

  for (let index = 0; index < entries.length;) {
    const score = entries[index].totalScore;
    const tiedEntries: PodiumEntry[] = [];

    while (
      index < entries.length &&
      entries[index].totalScore === score
    ) {
      tiedEntries.push(entries[index]);
      index += 1;
    }

    const place = places.length + 1;
    if (place > 3) break;
    places.push({ place, entries: tiedEntries, score });
  }

  if (places.length === 0) return null;

  return (
    <section className="podium" aria-label="Top three leaderboard scores">
      <ol className="podium-places">
        {places.map(({ place, entries: tiedEntries, score }) => (
          <li className={`podium-place podium-place-${place}`} key={place}>
            <span className="podium-medal">
              {place === 1 ? "1st" : place === 2 ? "2nd" : "3rd"}
            </span>
            <strong className="podium-name">
              {tiedEntries.map((entry) => entry.name).join(" & ")}
            </strong>
            <span>{score} points</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default LeaderboardPodium;
