// Generic FeedbackBox class
class FeedbackBox<T> {
  private feedbacks: T[] = [];

  addFeedback(feedback: T) {
    this.feedbacks.push(feedback);
  }

  getAllFeedback(): T[] {
    return [...this.feedbacks];
  }
}

// For quiz feedback (as strings)
const quizFeedback = new FeedbackBox<string>();
quizFeedback.addFeedback("Great quiz!");
quizFeedback.addFeedback("Too hard!");
console.log(quizFeedback.getAllFeedback());

// For lesson feedback (as objects)
type LessonFeedback = { rating: number; comment: string };
const lessonFeedback = new FeedbackBox<LessonFeedback>();
lessonFeedback.addFeedback({ rating: 5, comment: "Loved it!" });
console.log(lessonFeedback.getAllFeedback());

// Generic function
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstQuizFeedback = getFirstItem(quizFeedback.getAllFeedback()); // string
const firstLessonFeedback = getFirstItem(lessonFeedback.getAllFeedback()); // LessonFeedback object
