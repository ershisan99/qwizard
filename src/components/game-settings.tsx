import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchCategories } from "../api/openTrivia/hooks";
import { FullScreenLoader } from "./loader-full-screen";
import { difficultyOptions, typeOptions } from "../constants/trivia-params";
import { useRouter } from "next/router";
import { removeEmpty } from "../helpers/helpers";

const schema = z.object({
  amount: z
    .number()
    .min(1, { message: "Minimum 1 question" })
    .max(50, { message: "Maximum 50 questions at a time" }),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  type: z.string().optional(),
});

export const GameSettings = () => {
  const router = useRouter();
  const { data: categories, isLoading, error } = useFetchCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 10,
      category: "",
      difficulty: "",
      type: "",
    },
  });
  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>Error</div>;

  return (
    <form
      className={"flex h-full w-full flex-col justify-between gap-4"}
      onSubmit={handleSubmit((data) => {
        const cleanData = removeEmpty(data);
        router.push({
          pathname: "/play/",
          query: cleanData as any,
        });
      })}
    >
      <div className={"flex w-full flex-col gap-4"}>
        <label className={"label"}>
          <span>Amount of questions:</span>
          <input
            type="number"
            className={"input"}
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount?.message && (
            <p className={"text-sm text-red-500"}>
              {errors?.amount?.message as unknown as string}
            </p>
          )}
        </label>
        <label className={"label"}>
          <span>Category:</span>
          <select className={"input"} {...register("category")}>
            <option value={""}>Any category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className={"label"}>
          <span>Difficulty:</span>
          <select className={"input"} {...register("difficulty")}>
            {difficultyOptions?.map((difficulty) => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </label>
        <label className={"label"}>
          <span>Type:</span>
          <select className={"input"} {...register("type")}>
            {typeOptions?.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className={"btn"}>
        Play
      </button>
    </form>
  );
};
