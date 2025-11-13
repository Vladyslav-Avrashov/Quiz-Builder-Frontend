import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIQuiz, APIQuizSummary } from "../utils/types";
import {
  fetchQuizzes,
  fetchQuizById,
  createQuiz,
  deleteQuiz,
} from "./quizOperations";

interface QuizzesState {
  list: APIQuizSummary[];
  currentQuiz: APIQuiz | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuizzesState = {
  list: [],
  currentQuiz: null,
  status: "idle",
  error: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchQuizzes.fulfilled,
        (state, action: PayloadAction<APIQuizSummary[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchQuizById.fulfilled,
        (state, action: PayloadAction<APIQuiz>) => {
          state.status = "succeeded";
          state.currentQuiz = action.payload;
        }
      )
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createQuiz.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.list = state.list.filter((quiz) => quiz._id !== action.payload);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentQuiz, setError } = quizzesSlice.actions;

export default quizzesSlice.reducer;
