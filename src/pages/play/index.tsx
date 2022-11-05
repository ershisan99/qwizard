import { useFetchQuestions, useFetchToken } from "../../api/openTrivia/hooks";
import { Game } from "../../components/game";
import { FullScreenLoader } from "../../components/loader-full-screen";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

const Play = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const addCorrectAnswerId = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers([...correctAnswers, currentQuestionIndex]);
    setTotalAnswers(totalAnswers + 1);
  };
  const localToken = localStorage.getItem("token");
  const { data: token, isLoading: tokenLoading } = useFetchToken(!localToken);
  const router = useRouter();
  const params = router.query;
  const { data, isLoading, error } = useFetchQuestions(
    { ...params, token: localToken || token },
    !tokenLoading
  );

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>Error</div>;

  if (currentQuestionIndex === data?.results.length) {
    return (
      <div
        className={
          "flex h-screen w-full flex-col items-center justify-center gap-4"
        }
      >
        <p className={"text-2xl"}>Game over</p>
        <p className={"text-2xl"}>
          Your result: {correctAnswers.length}/{totalAnswers}
        </p>
        <Link href={"/"} className={"rounded-full bg-sky-500 px-6 py-2"}>
          Play again
        </Link>
      </div>
    );
  }

  if (!(data && data.results && data.results[currentQuestionIndex])) {
    return <div>Something went wrong</div>;
  }

  const currentQuestion = data?.results[currentQuestionIndex];

  return (
    <Game
      correctAnswer={currentQuestion!.correct_answer}
      incorrectAnswers={currentQuestion!.incorrect_answers}
      question={currentQuestion!.question || ""}
      onNextClick={() => setCurrentQuestionIndex((i) => i + 1)}
      addCorrectAnswerId={addCorrectAnswerId}
      correctAnswers={correctAnswers.length}
      totalAnswers={totalAnswers}
    />
  );
};

export default dynamic(() => Promise.resolve(Play), { ssr: false });
