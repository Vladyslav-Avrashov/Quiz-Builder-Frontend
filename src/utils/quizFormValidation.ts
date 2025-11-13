import * as Yup from "yup";
import { QuestionType } from "../utils/types";

const optionSchema = Yup.object().shape({
  text: Yup.string().trim().required("Option text is required"),
});

const questionSchema = Yup.object().shape({
  text: Yup.string().trim().required("Question text is required"),
  questionType: Yup.string<QuestionType>().required(),

  options: Yup.array().when("questionType", {
    is: (val: QuestionType) =>
      val === QuestionType.SINGLE_CHOICE ||
      val === QuestionType.MULTIPLE_CHOICE,
    then: (schema) =>
      schema
        .of(optionSchema)
        .min(2, "At least 2 options are required")
        .required("Options are required for this question type"),
    otherwise: (schema) =>
      schema.max(0, "Options are not allowed for this question type"),
  }),

  correctAnswerIndex: Yup.number().when("questionType", {
    is: QuestionType.SINGLE_CHOICE,
    then: (schema) => schema.required("A correct answer must be selected"),
  }),

  correctAnswerBoolean: Yup.boolean().when("questionType", {
    is: QuestionType.BOOLEAN,
    then: (schema) => schema.required("True or False must be selected"),
  }),

  correctAnswerIndices: Yup.object<Record<string, boolean>>().when(
    "questionType",
    {
      is: QuestionType.MULTIPLE_CHOICE,
      then: (schema) =>
        schema
          .test(
            "at-least-one-true",
            "At least one correct answer must be checked",
            (value) => {
              if (!value) return false;
              return Object.values(value).some(Boolean);
            }
          )
          .required(),
    }
  ),
});

export const quizValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .required("Quiz title is required"),
  questions: Yup.array()
    .of(questionSchema)
    .min(1, "At least one question is required")
    .required(),
});
