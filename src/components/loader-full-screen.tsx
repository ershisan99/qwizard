import { Loader } from "./loader";

export const FullScreenLoader = () => {
  return (
    <div className={"flex h-screen w-full items-center justify-center"}>
      <Loader />
    </div>
  );
};
