import { QuestionType, FormQuestion, FormOption } from "./types";

export const createNewOption = (): FormOption => ({
  id: crypto.randomUUID(),
  text: "",
});

export const createNewQuestion = (): FormQuestion => ({
  id: crypto.randomUUID(),
  text: "",
  questionType: QuestionType.SINGLE_CHOICE,
  options: [createNewOption(), createNewOption()],
  correctAnswerIndex: 0,
  correctAnswerIndices: {},
  correctAnswerBoolean: true,
});
