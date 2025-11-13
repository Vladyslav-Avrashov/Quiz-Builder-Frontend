import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";
import { FormQuestion, QuestionType } from "../../utils/types";
import { createNewOption } from "../../utils/quizFormUtils";
import { IconPlus, IconX } from "../../components/Icons/Icons";
import styles from "./QuizForm.module.css";

interface QuestionOptionsProps {
  question: FormQuestion;
  qIndex: number;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

export const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  question,
  qIndex,
  setFieldValue,
}) => {
  const isSingleChoice = question.questionType === QuestionType.SINGLE_CHOICE;
  const fieldName = `questions.${qIndex}`;
  const radioName = `${fieldName}.correctAnswerIndex`;

  return (
    <div className={styles.optionsContainer}>
      <label className={styles.inputLabel}>
        Options (
        {isSingleChoice
          ? "Select the correct answer"
          : "Check all correct answers"}
        )
      </label>
      <FieldArray
        name={`${fieldName}.options`}
        render={(arrayHelpers) => (
          <>
            {question.options.map((opt, oIndex) => (
              <div key={opt.id} className={styles.optionItem}>
                {isSingleChoice ? (
                  <Field
                    type="radio"
                    name={radioName}
                    value={String(oIndex)}
                    onClick={() => setFieldValue(radioName, oIndex)}
                    className={styles.formRadio}
                  />
                ) : (
                  <Field
                    type="checkbox"
                    name={`${fieldName}.correctAnswerIndices.${opt.id}`}
                    className={styles.formCheckbox}
                  />
                )}
                <Field
                  type="text"
                  name={`${fieldName}.options.${oIndex}.text`}
                  className="form-input"
                  placeholder={`Option ${oIndex + 1}`}
                />
                {question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(oIndex)}
                    className={styles.removeButton}
                  >
                    <IconX />
                  </button>
                )}
              </div>
            ))}
            <ErrorMessage name={`${fieldName}.options`}>
              {(msg) =>
                typeof msg === "string" ? (
                  <div className={styles.errorText}>{msg}</div>
                ) : null
              }
            </ErrorMessage>
            <button
              type="button"
              onClick={() => arrayHelpers.push(createNewOption())}
              className={styles.addOptionButton}
            >
              <IconPlus />
              <span>Add Option</span>
            </button>
          </>
        )}
      />
    </div>
  );
};
