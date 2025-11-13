import { BASE_API_URL } from "../constants/constants";
import { APIQuiz, APIQuizSummary } from "./types";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    const message =
      errorData.data?.message || errorData.message || response.statusText;
    throw new Error(message);
  }
  return response.json();
}

export const api = {
  fetchQuizList: async (): Promise<APIQuizSummary[]> => {
    const response = await fetch(`${BASE_API_URL}/quizzes`);
    return handleResponse(response);
  },

  fetchQuizById: async (id: string): Promise<APIQuiz> => {
    const response = await fetch(`${BASE_API_URL}/quizzes/${id}`);
    return handleResponse(response);
  },

  deleteQuizById: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_API_URL}/quizzes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      await handleResponse(response);
    }
  },

  createQuiz: async (
    quizData: Omit<APIQuiz, "_id" | "questions"> & {
      questions: Omit<APIQuiz["questions"][0], "_id">[];
    }
  ): Promise<APIQuiz> => {
    const response = await fetch(`${BASE_API_URL}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    });
    return handleResponse(response);
  },
};
