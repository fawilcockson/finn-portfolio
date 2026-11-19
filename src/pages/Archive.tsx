import { quizzes } from "../quizzes";

export default function Archive() {
  // newest first
  const list = [...quizzes].sort((a, b) => b.week - a.week);

  return (
    <div>
      <h1>Quiz Archive</h1>
      {list.map((q) => (
        <div key={q.week} className="row">
          <span className="name">{q.title}</span>
          <span className="tag">{q.date}</span>
          <a href={q.formUrl} target="_blank" rel="noreferrer">
            Take it
          </a>
        </div>
      ))}
    </div>
  );
}