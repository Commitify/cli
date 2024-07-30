import { QuestionType, type Answer, type Question } from "@comitter/shared/types";
import { askChoice, askNumber, askString } from "./ask";

export const process = async (questions: Question[]): Promise<Answer[]> => {
  const answers = []

  for(const question of questions) {
    if(question.type === QuestionType.String) {
      answers.push(await askString(question))
    } else if(question.type === QuestionType.Number) {
      answers.push(await askNumber(question))
    } else if(question.type === QuestionType.Select) {
      answers.push(await askChoice(question))
    } else {
      throw new Error("Unknown Question type");
    }
  }

  return answers
}