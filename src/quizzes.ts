export interface Quiz {
  week: number;
  title: string;
  formUrl: string; // the link people use to take the quiz
  csvUrl: string;  // the published Leaderboard tab for that form's sheet
  date?: string;  // optional, for display purposes only
}

export const quizzes: Quiz[] = [
  {
    week: 1,
    title: "Week 1",
    formUrl: "https://forms.gle/xxxx",
    csvUrl: "https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=123&single=true&output=csv",
    date: "19/11/2026",
  },
  // add a new entry here each week
];