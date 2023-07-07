interface Question {
  question: string;
  options: [
    {
      answer: string;
      correct?: boolean;
    }
  ];
}

export function getCorrectAnswersIndexes(question: Question): number[] {
  return question.options
    .filter((option) => option.correct)
    .map((correctOption) => question.options.indexOf(correctOption));
}

export function haveSameElements(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const arr1Sorted = arr1.sort();
  const arr2Sorted = arr2.sort();
  for (let i = 0; i < arr1Sorted.length; i++) {
    if (arr1Sorted[i] !== arr2Sorted[i]) {
      return false;
    }
  }
  return true;
}
