import axios from "axios";
import { removeEmpty } from "../../helpers/helpers";

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

export interface CategoriesRes {
  trivia_categories: Categories[];
}
export interface Categories {
  id: number;
  name: string;
}

export const fetchQuestions = (params: FetchQuestionsParams) => {
  return instance
    .get<Questions>("/api.php?", {
      params: removeEmpty(params),
    })
    .then((res) => res.data);
};

export const fetchCategories = () => {
  return instance
    .get<CategoriesRes>("/api_category.php")
    .then((res) => res.data.trivia_categories);
};
