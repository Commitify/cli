import { QuestionType, type Answer, type Question } from "@comitify/shared";
import prompts from "prompts";

export const askString = async (question: Question): Promise<Answer> => {
  if (question.type !== QuestionType.String)
    throw new Error("QuestionType not String");

  const p = await prompts({
    name: question.id,
    message: question.title,
    type: "text",
    hint: question.tips,
    initial: question.placeholder,
    validate: question.validator,
  });

  const value = p[question.id] as string;

  return {
    question,
    value,
    formattedValue: question?.formatter ? question?.formatter(value) : value,
  };
};

export const askNumber = async (question: Question): Promise<Answer> => {
  if (question.type !== QuestionType.Number)
    throw new Error("QuestionType not Number");

  const p = await prompts({
    name: question.id,
    message: question.title,
    type: "number",
    hint: question.tips,
    initial: question.placeholder,
    validate: question.validator,
  });

  const value = p[question.id] as string;

  return {
    question,
    value,
    formattedValue: question?.formatter ? question?.formatter(value) : value,
  };
};

export const askChoice = async (question: Question): Promise<Answer> => {
  if (question.type !== QuestionType.Select)
    throw new Error("QuestionType not Select");

  const p = await prompts({
    name: question.id,
    message: question.title,
    type: "select",
    choices: question.options.map((option) => ({
      title: option.title,
      value: option.value,
    })),
    hint: question.tips,
  });

  const value = p[question.id] as string;

  return {
    question,
    value,
    formattedValue: value,
  };
};
