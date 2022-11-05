import type { FC } from "react";
import { useMemo, useState } from "react";
import parse from "html-react-parser";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
type GameProps = {
  correctAnswer: string;
  question: string;
  onNextClick: () => void;
  addCorrectAnswerId: (isCorrect: boolean) => void;
  correctAnswers: number;
  incorrectAnswers: string[];
  totalAnswers: number;
};

export const Game: FC<GameProps> = ({
  correctAnswer,
  question,
  onNextClick,
  addCorrectAnswerId,
  correctAnswers,
  totalAnswers,
  incorrectAnswers,
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const options = useMemo(
    () => [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
    [correctAnswer, incorrectAnswers]
  );
  const handleAnswered = (option: string) => {
    if (option === correctAnswer) {
      setIsCorrect(true);
      addCorrectAnswerId(true);
    } else {
      setIsCorrect(false);
      addCorrectAnswerId(false);
    }
    setAnswer(option);
  };

  return (
    <div className={"flex h-screen w-screen flex-col gap-6 p-4"}>
      <header>
        <Link className={"flex items-center gap-3 text-sm"} href={"/"}>
          <ArrowLeftIcon className={"h-4 w-4"} /> Go home
        </Link>
      </header>
      <main className={"flex h-full w-full w-full flex-col items-start gap-4"}>
        <div className={"text-2xl font-bold text-slate-100"}>
          {parse(question)}
        </div>
        <div className={"flex w-full flex-grow flex-col items-start gap-4"}>
          {options.map((option, index) => (
            <button
              key={option}
              className={
                "flex w-full gap-3 rounded-xl bg-sky-800 p-3 text-left text-white" +
                " " +
                getColor(isCorrect, correctAnswer, answer, option)
              }
              onClick={() => handleAnswered(option)}
            >
              <Icon index={index} /> {parse(option)}
            </button>
          ))}
        </div>

        <div className={"flex w-full flex-col gap-2"}>
          <p className={"w-full text-center"}>
            Correct Answers: {`${correctAnswers}/${totalAnswers}`}
          </p>
          <button
            className={"btn"}
            onClick={() => {
              onNextClick();
              setAnswer(null);
              setIsCorrect(null);
            }}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

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

const getColor = (
  isCorrect: boolean | null,
  correctAnswer: string | null,
  answer: string | null,
  option: string
) => {
  if (isCorrect === null) {
    return "bg-sky-800";
  }
  if (correctAnswer === option) {
    return "bg-green-500";
  }
  if (!isCorrect && answer === option) {
    return "bg-red-500";
  }
};
