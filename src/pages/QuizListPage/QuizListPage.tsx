import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchQuizzes, deleteQuiz } from "../../redux/quizOperations";
import {
  selectQuizList,
  selectQuizzesStatus,
  selectQuizzesError,
} from "../../redux/quizSelectors";
import { FullPageSpinner } from "../../components/Spinner/Spinner";
import { IconTrash } from "../../components/Icons/Icons";
import { Modal } from "../../components/Modal/Modal";
import styles from "./QuizListPage.module.css";

export const QuizListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector(selectQuizList);
  const status = useAppSelector(selectQuizzesStatus);
  const error = useAppSelector(selectQuizzesError);

  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setQuizToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (quizToDelete) {
      dispatch(deleteQuiz(quizToDelete));
      setQuizToDelete(null);
    }
  };

  const renderContent = () => {
    if (status === "loading" && quizzes.length === 0) {
      return <FullPageSpinner />;
    }

    if (error) {
      return (
        <div className={styles.errorBox}>
          <p>Error loading quizzes: {error}</p>
        </div>
      );
    }

    if (quizzes.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No quizzes found. Create a new one!</p>
          <Link to="/create" className="button button-primary">
            Create Quiz
          </Link>
        </div>
      );
    }

    return (
      <ul className={styles.quizList}>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className={styles.quizListItem}>
            <Link to={`/quizzes/${quiz._id}`} className={styles.quizItem}>
              <div className={styles.info}>
                <h2 className={styles.title}>{quiz.title}</h2>
                <span className={styles.count}>
                  {quiz.questionCount} Questions
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={(e) => handleDeleteClick(e, quiz._id)}
              className={styles.deleteButton}
              aria-label={`Delete ${quiz.title}`}
            >
              <IconTrash />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>All Quizzes</h1>
      {renderContent()}

      <Modal
        show={!!quizToDelete}
        onClose={() => setQuizToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
      >
        Are you sure you want to delete this quiz? This action cannot be undone.
      </Modal>
    </div>
  );
};
