import type { FC } from "react";
import { useState } from "react";
import parse from "html-react-parser";

type GameProps = {
  options: string[];
  correctAnswer: string;
  question: string;
  onNextClick: () => void;
};

export const Game: FC<GameProps> = ({
  correctAnswer,
  options,
  question,
  onNextClick,
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswered = (option: string) => {
    if (option === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setAnswer(option);
  };

  return (
    <>
      <main
        className={
          "flex h-screen w-screen w-full flex-col items-start gap-4 p-4"
        }
      >
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

        <button
          className={
            "w-full rounded-3xl bg-sky-900 p-3 text-center text-2xl text-white"
          }
          onClick={() => {
            onNextClick();
            setAnswer(null);
          }}
        >
          Next
        </button>
      </main>
    </>
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
