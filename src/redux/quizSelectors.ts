import { RootState } from "./store";

export const selectQuizList = (state: RootState) => state.quizzes.list;
export const selectCurrentQuiz = (state: RootState) =>
  state.quizzes.currentQuiz;
export const selectQuizById = (state: RootState, id?: string) =>
  id
    ? state.quizzes.currentQuiz?._id === id
      ? state.quizzes.currentQuiz
      : undefined
    : undefined;
export const selectQuizzesStatus = (state: RootState) => state.quizzes.status;
export const selectQuizzesError = (state: RootState) => state.quizzes.error;
