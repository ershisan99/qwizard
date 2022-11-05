import axios from "axios";

export const instance = axios.create({
  baseURL: "https://opentdb.com/",
  timeout: 1000,
});

export type Difficulty = "easy" | "medium" | "hard";
export type Category = number;
export type AnswerType = "multiple" | "boolean";
export type Amount = number;

export interface Questions {
  response_code: number;
  results: QuestionsResults[];
}
export interface QuestionsResults {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type FetchQuestionsParams = {
  amount?: Amount;
  difficulty?: Difficulty;
  category?: Category;
  type?: AnswerType;
};

export const fetchQuestions = (params: FetchQuestionsParams) => {
  return instance
    .get<Questions>("/api.php?", {
      params,
    })
    .then((res) => res.data);
};