const questList: Record<number, any> = {};

function recordAnswer(questionID: number, answer: any) {
  questList[questionID] = answer;
}

recordAnswer(1, "Delhi");
recordAnswer(2, 75);
recordAnswer(3, [7, true, "Hello"]);

console.log(questList);
