import { type NextPage } from "next";
import { useFetchQuestions } from "../api/openTrivia/hooks";
import { Loader } from "../components/loader";
import { useState } from "react";

const Icon = ({ index }: { index: number }) => {
  const letter = String.fromCharCode(65 + index);
  return (
    <span
      className={
        "flex h-6 w-6 items-center justify-center rounded-full border border-white"
      }
    >
      {letter}
    </span>
  );
};

const Home: NextPage = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchQuestions({
    amount: 1,
  });

  const [answer, setAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (data && data.results && data.results[0]) {
    const options = [
      ...data.results[0].incorrect_answers,
      data.results[0].correct_answer,
    ].sort(() => Math.random() - 0.5);

    const handleAnswered = (option: string) => {
      if (option === data.results[0]?.correct_answer) {
        alert("Correct!");
      } else {
        alert("Wrong!");
      }
    };

    return (
      <>
        <main
          className={
            "flex h-screen w-screen w-full flex-col items-start gap-4 bg-slate-900 p-4"
          }
        >
          <div
            className={"text-2xl font-bold text-slate-100 "}
            dangerouslySetInnerHTML={{ __html: data?.results[0].question }}
          />
          <div className={"flex w-full flex-grow flex-col items-start gap-4"}>
            {options.map((option, index) => (
              <button
                key={option}
                className={
                  "flex w-full gap-3 rounded-xl bg-sky-800 p-3 text-left text-white"
                }
                onClick={() => handleAnswered(option)}
              >
                <Icon index={index} /> {option}
              </button>
            ))}
          </div>
          {isRefetching && (
            <div className={"flex h-full w-full items-center justify-center"}>
              <Loader />
            </div>
          )}

          <button
            className={
              "w-full rounded-3xl bg-sky-900 p-3 text-center text-2xl text-white"
            }
            onClick={() => {
              refetch();
              setAnswer(null);
            }}
          >
            Next
          </button>
        </main>
      </>
    );
  }
  return <>Sum tin wong</>;
};

export default Home;
