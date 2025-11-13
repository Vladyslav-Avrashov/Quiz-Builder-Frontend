import React, { useEffect } from "react";
import { APIQuestion, QuestionType } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectQuizzesStatus, selectQuizById } from "../../redux/quizSelectors";
import { fetchQuizById } from "../../redux/quizOperations";
import { FullPageSpinner } from "../../components/Spinner/Spinner";
import { IconChevronLeft } from "../../components/Icons/Icons";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./QuizDetailPage.module.css";

const renderQuestionDetails = (question: APIQuestion) => {
  const isCorrect = ({
    type,
    value,
  }: {
    type: "single" | "multi" | "bool";
    value: number | boolean;
  }): boolean => {
    if (type === "single" && typeof value === "number")
      return question.correctAnswerIndex === value;
    if (type === "multi" && typeof value === "number")
      return !!question.correctAnswerIndices?.includes(value);
    if (type === "bool" && typeof value === "boolean")
      return question.correctAnswerBoolean === value;
    return false;
  };

  switch (question.questionType) {
    case QuestionType.SINGLE_CHOICE:
    case QuestionType.MULTIPLE_CHOICE:
      return (
        <ul className={styles.optionsList}>
          {question.options?.map(
            (option: string | { text: string }, oIndex: number) => (
              <li
                key={oIndex}
                className={`${styles.optionItem} ${
                  isCorrect({
                    type:
                      question.questionType === QuestionType.SINGLE_CHOICE
                        ? "single"
                        : "multi",
                    value: oIndex,
                  })
                    ? styles.correctAnswer
                    : ""
                }`}
              >
                {question.questionType === QuestionType.MULTIPLE_CHOICE && (
                  <span className={styles.checkboxPlaceholder}>
                    {isCorrect({ type: "multi", value: oIndex }) ? "☑️" : "☐"}
                  </span>
                )}
                {question.questionType === QuestionType.SINGLE_CHOICE && (
                  <span className={styles.radioPlaceholder}>
                    {isCorrect({ type: "single", value: oIndex }) ? "⦿" : "◯"}
                  </span>
                )}
                {typeof option === "string"
                  ? option
                  : option && typeof option === "object" && "text" in option
                  ? option.text
                  : String(option)}
              </li>
            )
          )}
        </ul>
      );

    case QuestionType.BOOLEAN:
      return (
        <div className={styles.booleanOptions}>
          <span
            className={`${styles.booleanChoice} ${
              isCorrect({ type: "bool", value: true })
                ? styles.correctAnswer
                : ""
            }`}
          >
            {isCorrect({ type: "bool", value: true }) ? "⦿ " : "◯ "}
            True
          </span>
          <span
            className={`${styles.booleanChoice} ${
              isCorrect({ type: "bool", value: false })
                ? styles.correctAnswer
                : ""
            }`}
          >
            {isCorrect({ type: "bool", value: false }) ? "⦿ " : "◯ "}
            False
          </span>
        </div>
      );

    case QuestionType.INPUT:
      return (
        <div className={styles.inputAnswer}>
          <p className={styles.inputQuestionText}>
            This is an open input question. The expected answer is not stored in
            the data structure.
          </p>
          <input
            type="text"
            className={styles.inputField}
            placeholder="User would type answer here..."
            disabled
          />
        </div>
      );

    default:
      return null;
  }
};

export const QuizDetailPage: React.FC = () => {
  const params = useParams<{ quizId: string }>();
  const id = params.quizId;
  const dispatch = useAppDispatch();
  const quiz = useAppSelector((state) => selectQuizById(state, id || ""));
  const status = useAppSelector(selectQuizzesStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !quiz) {
      dispatch(fetchQuizById(id));
    }
  }, [dispatch, id, quiz]);

  const handleBack = () => {
    navigate("/");
  };

  const renderContent = () => {
    if (status === "loading" && !quiz) {
      return <FullPageSpinner />;
    }

    if (status === "failed" && !quiz) {
      return (
        <div className={styles.errorBox}>
          <p>Error loading quiz. Please try again.</p>
        </div>
      );
    }

    if (!quiz) {
      return (
        <div className={styles.errorBox}>
          <p>Quiz not found.</p>
        </div>
      );
    }

    return (
      <div className={styles.quizContent}>
        <p className={styles.questionCount}>
          Total Questions: {quiz.questions.length}
        </p>

        {quiz.questions.map((q: APIQuestion, qIndex: number) => (
          <div key={q._id || qIndex} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>
                Question {qIndex + 1}
              </span>
              <span className={styles.questionType}>
                [{(q.questionType ?? "Unknown").replace("_", " ")}]
              </span>
            </div>
            <p className={styles.questionText}>{q.text}</p>
            <div className={styles.detailsSection}>
              {renderQuestionDetails(q)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      {quiz && <h1 className={styles.pageTitle}>{quiz.title}</h1>}

      <div className={styles.headerButtons}>
        <button onClick={handleBack} className={styles.backButton}>
          <IconChevronLeft />
          Back to List
        </button>
      </div>

      {renderContent()}
    </div>
  );
};
