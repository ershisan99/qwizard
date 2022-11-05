import { type NextPage } from "next";
import { GameSettings } from "../components/game-settings";

const Home: NextPage = () => {
  return (
    <div className={"h-screen p-4"}>
      <GameSettings />
    </div>
  );
};
export default Home;
