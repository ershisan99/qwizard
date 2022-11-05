import { type NextPage } from "next";
import { useFetchQuestions } from "../api/openTrivia/hooks";
import { Loader } from "../components/loader";
import { Game } from "../components/game";

const Home: NextPage = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchQuestions({
    amount: 1,
  });

  if (isLoading || isRefetching)
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <Loader />
      </div>
    );
  if (error) return <div>Error</div>;
  if (!(data && data.results && data.results[0])) {
    return <div>Something went wrong</div>;
  }

  const currentQuestion = data?.results[0];
  const { incorrect_answers, correct_answer, question } = currentQuestion;
  const options = [...incorrect_answers, correct_answer].sort(
    () => Math.random() - 0.5
  );
  return (
    <Game
      correctAnswer={correct_answer}
      options={options}
      question={question}
      onNextClick={refetch}
    />
  );
};
export default Home;
