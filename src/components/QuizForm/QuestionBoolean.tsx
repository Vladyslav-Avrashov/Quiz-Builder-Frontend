import React from "react";
import { Field } from "formik";
import { FormQuestion } from "../../utils/types";
import styles from "./QuizForm.module.css";

interface QuestionBooleanProps {
  question: FormQuestion;
  qIndex: number;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

export const QuestionBoolean: React.FC<QuestionBooleanProps> = ({
  qIndex,
  setFieldValue,
}) => {
  const fieldName = `questions.${qIndex}`;
  const radioName = `${fieldName}.correctAnswerBoolean`;

  return (
    <div className={styles.optionsContainer}>
      <label className={styles.inputLabel}>Correct Answer</label>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <Field
            type="radio"
            name={radioName}
            value="true"
            onClick={() => setFieldValue(radioName, true)}
            className={styles.formRadio}
          />
          <span>True</span>
        </label>
        <label className={styles.radioLabel}>
          <Field
            type="radio"
            name={radioName}
            value="false"
            onClick={() => setFieldValue(radioName, false)}
            className={styles.formRadio}
          />
          <span>False</span>
        </label>
      </div>
    </div>
  );
};
