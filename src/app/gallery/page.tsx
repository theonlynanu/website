import Pomodoro from "./_components/Pomodoro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
};

export default function Index() {
  return (
    <>
      <Pomodoro />
    </>
  );
}
