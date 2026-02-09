// 1. Union type
type InstructorOrAdmin = "Instructor" | "Admin";

// 2.
type Assignment = {
  title: string;
  dueDate: Date;
  points: number;
};
// Readonly type
type ReadonlyAssignment = Readonly<Assignment>;

// 3.
type LearnerStats = {
  quizzes: number;
  videos: number;
  assignments: number;
};
// Mapped type
type StatsAsStrings = {
  [K in keyof LearnerStats]: string;
};
