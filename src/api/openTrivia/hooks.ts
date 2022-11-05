import { useQuery } from "@tanstack/react-query";
import type { FetchQuestionsParams } from "./index";
import { fetchCategories, fetchQuestions } from "./index";

export const useFetchQuestions = (params: FetchQuestionsParams) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestions(params),
    enabled: !!params?.amount,
  });
};
export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
