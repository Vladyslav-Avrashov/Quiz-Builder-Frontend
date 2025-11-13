import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createQuiz } from "../../redux/quizOperations";
import {
  selectQuizzesStatus,
  selectQuizzesError,
} from "../../redux/quizSelectors";
import {
  QuizFormValues,
  CreateQuizPayload,
  QuestionType,
} from "../../utils/types";
import { createNewQuestion } from "../../utils/quizFormUtils";
import { QuizForm } from "../../components/QuizForm/QuizForm";
import styles from "./QuizCreatePage.module.css";
import { setError } from "../../redux/quizSlice";

const initialValues: QuizFormValues = {
  title: "",
  questions: [createNewQuestion()],
};

export const QuizCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectQuizzesStatus);
  const isLoading = status === "loading";
  const error = useAppSelector(selectQuizzesError);

  const handleSubmit = async (values: QuizFormValues) => {
    let apiQuestions: CreateQuizPayload["questions"] = [];

    try {
      apiQuestions = values.questions.map((q) => {
        switch (q.questionType) {
          case QuestionType.SINGLE_CHOICE: {
            return {
              text: q.text,
              questionType: q.questionType,
              options: q.options.map((opt) => opt.text),
              correctAnswerIndex: q.correctAnswerIndex,
            };
          }
          case QuestionType.MULTIPLE_CHOICE: {
            const correctIndices = q.options
              .map((opt, index) =>
                q.correctAnswerIndices[opt.id] ? index : -1
              )
              .filter((index) => index !== -1);
            return {
              text: q.text,
              questionType: q.questionType,
              options: q.options.map((opt) => opt.text),
              correctAnswerIndices: correctIndices,
            };
          }
          case QuestionType.BOOLEAN: {
            return {
              text: q.text,
              questionType: q.questionType,
              correctAnswerBoolean: q.correctAnswerBoolean,
            };
          }
          case QuestionType.INPUT: {
            return { text: q.text, questionType: q.questionType };
          }
          default:
            throw new Error("Unknown question type.");
        }
      });
    } catch (transformError) {
      console.error("Data transformation error:", transformError);
      const message =
        transformError instanceof Error
          ? transformError.message
          : "Data transformation error";
      dispatch(setError(message));
      return;
    }

    const quizData: CreateQuizPayload = {
      title: values.title,
      questions: apiQuestions,
    };

    try {
      await dispatch(createQuiz(quizData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to create quiz:", err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Create New Quiz</h1>
      <QuizForm
        initialValues={initialValues}
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
