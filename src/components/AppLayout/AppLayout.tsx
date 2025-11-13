import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { FullPageSpinner } from "../Spinner/Spinner";
import styles from "../../App.module.css";

const QuizListPage = lazy(() =>
  import("../../pages/QuizListPage/QuizListPage").then((module) => ({
    default: module.QuizListPage,
  }))
);
const QuizDetailPage = lazy(() =>
  import("../../pages/QuizDetailPage/QuizDetailPage").then((module) => ({
    default: module.QuizDetailPage,
  }))
);
const QuizCreatePage = lazy(() =>
  import("../../pages/QuizCreatePage/QuizCreatePage").then((module) => ({
    default: module.QuizCreatePage,
  }))
);

export const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <Suspense fallback={<FullPageSpinner />}>
            <Routes>
              <Route index element={<QuizListPage />} />
              <Route path="create" element={<QuizCreatePage />} />
              <Route path="quizzes/:quizId" element={<QuizDetailPage />} />
              <Route path="*" element={<QuizListPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </>
  );
};
