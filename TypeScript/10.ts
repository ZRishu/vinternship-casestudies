// function to check if Number is positive
function checkSign(num: number): void {
  if (num >= 0) {
    console.log("Number is positive");
  }
}

// function to check if Number is even or odd
function evenOrOdd(num: number): void {
  if (num % 2 == 0) {
    console.log("Number is even");
  } else {
    console.log("Number is odd");
  }
}

// function to calculate grade against marks
function getGrade(score: number): string {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

// function to get feedback according to grade
function provideFeedback(grade: string): void {
  switch (grade) {
    case "A":
      console.log("Feedback: Excellent performance!");
      break;
    case "B":
      console.log("Feedback: Great job! Keep it up.");
      break;
    case "C":
      console.log("Feedback: Good effort; aim higher next time.");
      break;
    case "D":
      console.log("Feedback: Needs improvement; review your work.");
      break;
    case "F":
      console.log("Feedback: Unsatisfactory; please seek help.");
      break;
    default:
      console.log("Invalid Grade.");
      break;
  }
}

// calling all the functions
checkSign(2)
evenOrOdd(9)

const grade = getGrade(86)
console.log(grade)
provideFeedback(grade)