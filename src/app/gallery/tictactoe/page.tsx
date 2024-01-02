import Game from "./_components/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
};

export default function Index() {
  return (
    <section className="mb-12">
      <Game />
      <p className="px-8 pt-6">
        If you're making a move against the AI, it may take a little bit for it
        to play its first move. This is due to cold-starts with the Google Cloud
        Run server, the opponent's first move should be played within 30
        seconds. If you have persistent issues, please contact me!
      </p>
    </section>
  );
}
