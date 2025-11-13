import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIQuiz, APIQuizSummary, CreateQuizPayload } from "../utils/types";
import { BASE_API_URL } from "../constants/constants";

async function handleApiError(response: Response) {
  if (response.ok) return;

  const errData = await response.json().catch(() => ({}));
  const message =
    errData.data?.message || errData.message || "Unknown API error";
  throw new Error(message);
}

export const fetchQuizzes = createAsyncThunk<APIQuizSummary[]>(
  "quizzes/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/quizzes`);
      await handleApiError(response);
      return (await response.json()) as APIQuizSummary[];
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

export const fetchQuizById = createAsyncThunk<APIQuiz, string>(
  "quizzes/fetchQuizById",
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/quizzes/${quizId}`);
      await handleApiError(response);
      return (await response.json()) as APIQuiz;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

export const createQuiz = createAsyncThunk<APIQuiz, CreateQuizPayload>(
  "quizzes/createQuiz",
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      await handleApiError(response);
      return (await response.json()) as APIQuiz;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

export const deleteQuiz = createAsyncThunk<string, string>(
  "quizzes/deleteQuiz",
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/quizzes/${quizId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        await handleApiError(response);
      }
      return quizId;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);
