"use client";
import { useState } from "react";

export default function About() {
  const [test, setTest] = useState<any>("Awaiting test");

  const squares: boardState[] = [
    "X",
    "O",
    "O",
    null,
    "O",
    "X",
    null,
    "X",
    "O",
    null,
  ];

  const makeCall = async () => {
    const requestData = JSON.stringify({ state: squares, gamemode: "minmax" });
    await fetch("/api/game", {
      method: "POST",
      mode: "cors",
      body: requestData,
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error contacting API - please send me a message!");
        }
      })
      .then((data) => {
        setTest(JSON.stringify(data.ai_move));
      })
      .catch((error: Error) => {
        console.log(error.message);
        setTest(error.message);
      });
  };
  return (
    <>
      <button onClick={makeCall} className="m-4 border border-standard-500 p-4">
        Make call
      </button>
      <p>{test}</p>
    </>
  );
}
