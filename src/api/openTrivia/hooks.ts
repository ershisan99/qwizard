import { useQuery } from "@tanstack/react-query";
import type { FetchQuestionsParams } from "./index";
import { fetchCategories, fetchQuestions, fetchToken } from "./index";

export const useFetchQuestions = (
  params: FetchQuestionsParams,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestions(params),
    enabled: !!params?.amount || enabled,
    onSuccess: (data) => {
      if (data.response_code === 4 || data.response_code === 3) {
        localStorage.setItem("token", "");
      }
    },
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
export const useFetchToken = (enabled: boolean) => {
  return useQuery({
    queryKey: ["token"],
    queryFn: () => fetchToken(),
    enabled: enabled,
    onSuccess: (data) => {
      localStorage.setItem("token", data);
    },
  });
};
