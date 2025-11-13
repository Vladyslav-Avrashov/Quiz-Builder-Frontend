import React from "react";
import { ErrorMessage, Field } from "formik";
import { FormQuestion, QuestionType } from "../../utils/types";
import { IconX } from "../Icons/Icons";
import { QuestionOptions } from "./QuestionOptions.js";
import { QuestionBoolean } from "./QuestionBoolean.js";
import styles from "./QuizForm.module.css";

type SetFieldValue = (
  field: string,
  value: unknown,
  shouldValidate?: boolean
) => void;

interface QuestionCardProps {
  question: FormQuestion;
  qIndex: number;
  setFieldValue: SetFieldValue;
  removeQuestion: () => void;
  questionCount: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  qIndex,
  setFieldValue,
  removeQuestion,
  questionCount,
}) => {
  const fieldName = `questions.${qIndex}`;

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newType = e.target.value as QuestionType;
    setFieldValue(`${fieldName}.questionType`, newType);

    if (newType === QuestionType.BOOLEAN || newType === QuestionType.INPUT) {
      setFieldValue(`${fieldName}.options`, []);
      setFieldValue(`${fieldName}.correctAnswerIndex`, 0);
      setFieldValue(`${fieldName}.correctAnswerIndices`, {});
    } else if (
      (newType === QuestionType.SINGLE_CHOICE ||
        newType === QuestionType.MULTIPLE_CHOICE) &&
      question.options.length < 2
    ) {
      setFieldValue(`${fieldName}.options`, [
        { id: crypto.randomUUID(), text: "" },
        { id: crypto.randomUUID(), text: "" },
      ]);
    }
  };

  const renderAnswerInputs = (
    currentQuestion: FormQuestion,
    currentQIndex: number,
    currentSetFieldValue: SetFieldValue
  ) => {
    switch (currentQuestion.questionType) {
      case QuestionType.SINGLE_CHOICE:
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <QuestionOptions
            question={currentQuestion}
            qIndex={currentQIndex}
            setFieldValue={currentSetFieldValue}
          />
        );

      case QuestionType.BOOLEAN:
        return (
          <QuestionBoolean
            question={currentQuestion}
            qIndex={currentQIndex}
            setFieldValue={currentSetFieldValue}
          />
        );

      case QuestionType.INPUT:
        return (
          <p className={styles.inputQuestionText}>
            This is an open-ended question. No correct answer is stored.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      {questionCount > 1 && (
        <button
          type="button"
          onClick={removeQuestion}
          className={styles.removeQuestionButton}
        >
          <IconX />
        </button>
      )}

      <div className={styles.questionForm}>
        <label className={styles.cardTitle}>Question {qIndex + 1}</label>

        <Field
          as="textarea"
          name={`${fieldName}.text`}
          className="form-textarea"
          placeholder="Enter the question text..."
          rows={3}
        />
        <ErrorMessage
          name={`${fieldName}.text`}
          component="div"
          className={styles.errorText}
        />

        <div>
          <label className={styles.inputLabel}>Question Type</label>
          <Field
            as="select"
            name={`${fieldName}.questionType`}
            className="form-select"
            onChange={handleQuestionTypeChange}
          >
            <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
            <option value={QuestionType.MULTIPLE_CHOICE}>
              Multiple Choice
            </option>
            <option value={QuestionType.BOOLEAN}>True / False</option>
            <option value={QuestionType.INPUT}>Open Input</option>
          </Field>
          <ErrorMessage
            name={`${fieldName}.questionType`}
            component="div"
            className={styles.errorText}
          />
        </div>

        <div className={styles.answersSection}>
          {renderAnswerInputs(question, qIndex, setFieldValue)}
        </div>
        <ErrorMessage
          name={`${fieldName}.correctAnswerIndex`}
          component="div"
          className={styles.errorText}
        />
        <ErrorMessage
          name={`${fieldName}.correctAnswerIndices`}
          component="div"
          className={styles.errorText}
        />
      </div>
    </div>
  );
};
