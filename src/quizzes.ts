export interface Quiz {
  week: number;
  title: string;
  formUrl: string; // the link people use to take the quiz
  csvUrl?: string;  // the published Leaderboard tab for that form's sheet
  date?: string;  // optional, for display purposes only
}

export const quizzes: Quiz[] = [
  {
    week: 1,
    title: "Week 1",
    formUrl: "https://forms.gle/1KCBo4W1q4efpRpN6",
    date: "19/11/2026",
  },
  {
    week: 2,
    title: "Week 2",
    formUrl: "https://forms.gle/XNrzQbJJq4xpVVbdA",
    date: "26/11/2026",
  }
];