export enum QuestionType {
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  BOOLEAN = "BOOLEAN",
  INPUT = "INPUT",
}

export interface APIQuestion {
  _id?: string;
  text: string;
  questionType: QuestionType;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerBoolean?: boolean;
  correctAnswerIndices?: number[];
}

export interface APIQuiz {
  _id: string;
  title: string;
  questions: APIQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface APIQuizSummary {
  _id: string;
  title: string;
  questionCount: number;
}

export interface FormOption {
  id: string; // React key
  text: string;
}

export type CheckboxState = Record<string, boolean>;

export interface FormQuestion {
  id: string;
  text: string;
  questionType: QuestionType;
  options: FormOption[];
  correctAnswerIndex: number;
  correctAnswerIndices: CheckboxState;
  correctAnswerBoolean: boolean;
}

export interface QuizFormValues {
  title: string;
  questions: FormQuestion[];
}

export type CreateQuizPayload = Omit<
  APIQuiz,
  "_id" | "questions" | "createdAt" | "updatedAt"
> & {
  questions: Omit<APIQuestion, "_id">[];
};
