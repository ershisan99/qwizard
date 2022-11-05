import { useQuery } from "@tanstack/react-query";
import type { FetchQuestionsParams } from "./index";
import { fetchQuestions } from "./index";

export const useFetchQuestions = (params: FetchQuestionsParams) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestions(params),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
