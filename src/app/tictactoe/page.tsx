import Game from "./components/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
};

export default function Index() {
  return (
    <>
      <Game />
    </>
  );
}
