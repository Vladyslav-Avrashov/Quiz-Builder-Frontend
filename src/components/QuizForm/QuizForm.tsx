import React from "react";
import { ErrorMessage, Field, FieldArray, Formik, FormikHelpers } from "formik";
import { Form as FormikForm } from "formik";
import {
  QuestionType,
  QuizFormValues,
  FormQuestion,
  FormOption,
} from "../../utils/types";
import { IconPlus } from "../../components/Icons/Icons";
import { createNewOption } from "../../utils/quizFormUtils";
import { quizValidationSchema } from "../../utils/quizFormValidation";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./QuizForm.module.css";
import { QuestionCard } from "./QuestionCard";

interface QuizFormProps {
  initialValues: QuizFormValues;
  isLoading: boolean;
  error: string | null;
  onSubmit: (
    values: QuizFormValues,
    formikHelpers: FormikHelpers<QuizFormValues>
  ) => void | Promise<void>;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  initialValues,
  isLoading,
  error,
  onSubmit,
}) => {
  const trimValues = (values: QuizFormValues): QuizFormValues => {
    const cloned: QuizFormValues = JSON.parse(JSON.stringify(values));
    cloned.title =
      typeof cloned.title === "string" ? cloned.title.trim() : cloned.title;
    cloned.questions = cloned.questions.map((q) => {
      const nq: FormQuestion = { ...q } as FormQuestion;
      if (typeof nq.text === "string") nq.text = nq.text.trim();
      if (Array.isArray(nq.options)) {
        nq.options = nq.options.map((opt: FormOption) => ({
          ...opt,
          text: typeof opt.text === "string" ? opt.text.trim() : opt.text,
        }));
      }
      return nq;
    });
    return cloned;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={quizValidationSchema}
      onSubmit={(values, helpers) => onSubmit(trimValues(values), helpers)}
      enableReinitialize={false}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <FormikForm className={styles.formContainer}>
          <div className={styles.card}>
            <label htmlFor="quizTitle" className={styles.cardTitle}>
              Quiz Title
            </label>
            <Field
              type="text"
              id="quizTitle"
              name="title"
              className="form-input"
              placeholder="e.g., JavaScript Fundamentals"
            />
            <ErrorMessage name="title">
              {(msg) =>
                typeof msg === "string" ? (
                  <div className={styles.errorText}>{msg}</div>
                ) : null
              }
            </ErrorMessage>
          </div>

          <FieldArray
            name="questions"
            render={(arrayHelpers) => (
              <>
                {values.questions.map((q, qIndex) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    qIndex={qIndex}
                    setFieldValue={setFieldValue}
                    removeQuestion={() => arrayHelpers.remove(qIndex)}
                    questionCount={values.questions.length}
                  />
                ))}

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        id: crypto.randomUUID(),
                        text: "",
                        questionType: QuestionType.SINGLE_CHOICE,
                        options: [createNewOption(), createNewOption()],
                        correctAnswerIndex: 0,
                        correctAnswerIndices: {},
                        correctAnswerBoolean: true,
                      })
                    }
                    className="button button-secondary"
                  >
                    <IconPlus />
                    <span>Add Question</span>
                  </button>

                  <div className={styles.submitContainer}>
                    {error && (
                      <div className={styles.errorBox}>
                        <strong>Error: </strong> {error}
                      </div>
                    )}
                    {(() => {
                      const hasEmptyQuestionText = values.questions.some(
                        (qq) => !qq.text || qq.text.trim() === ""
                      );

                      const hasEmptyOptionText = values.questions.some((qq) => {
                        return (
                          (qq.questionType === QuestionType.SINGLE_CHOICE ||
                            qq.questionType === QuestionType.MULTIPLE_CHOICE) &&
                          qq.options.some(
                            (opt) => !opt.text || opt.text.trim() === ""
                          )
                        );
                      });

                      const disableSubmit =
                        isLoading ||
                        isSubmitting ||
                        hasEmptyQuestionText ||
                        hasEmptyOptionText;

                      return (
                        <button
                          type="submit"
                          disabled={disableSubmit}
                          className="button button-primary"
                        >
                          {isLoading || isSubmitting ? (
                            <Spinner />
                          ) : (
                            "Save Quiz"
                          )}
                          {(isLoading || isSubmitting) && (
                            <span style={{ marginLeft: "8px" }}>Saving...</span>
                          )}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </>
            )}
          />
        </FormikForm>
      )}
    </Formik>
  );
};
