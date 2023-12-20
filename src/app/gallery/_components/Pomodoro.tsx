"use client";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import CircularProgressBar from "./CircularProgressBar";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Pomodoro() {
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [restTime, setRestTime] = useState(1800);
  const [repetitions, setRepetitions] = useState(4);

  // These two are saved as state due to the need for re-rendering the count
  // via useEffect
  const [runTimeInSeconds, setRunTimeInSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  // These three should(?) be able to be saved not as state, but I've run into
  // some issues trying to pull them out
  const [isAwait, setIsAwait] = useState(false);
  const [remainingReps, setRemainingReps] = useState(4);
  const [currStatus, setCurrStatus] = useState<"work" | "break" | "rest">(
    "work"
  );

  // ! This is for enabling the progress slider for testing the animation -
  // ! it is NOT necessary for ring animation and should be removed after testing
  // ! is complete
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setRunTimeInSeconds(runTimeInSeconds - 1);
      }
    }, 1000);

    if (runTimeInSeconds === 0) {
      setIsRunning(false);
      setIsAwait(true);
    }

    return () => clearInterval(interval);
  }, [runTimeInSeconds, isRunning]);

  // Trust me, these are DRYer than they look
  function reset() {
    setIsRunning(false);
    setCurrStatus("work");
    setIsAwait(false);
    setRunTimeInSeconds(workTime);
    setRemainingReps(repetitions);
  }

  function engageRest() {
    setCurrStatus("rest");
    setRunTimeInSeconds(restTime);
    setIsRunning(true);
  }

  function engageWork() {
    setCurrStatus("work");
    setRunTimeInSeconds(workTime);
    setIsRunning(true);
  }

  function engageBreak() {
    setCurrStatus("break");
    setRunTimeInSeconds(breakTime);
    setIsRunning(true);
  }

  function nextPhase() {
    if (remainingReps === 0 && currStatus === "work") {
      engageRest();
    } else if (currStatus === "work") {
      engageBreak();
    } else if (currStatus === "break") {
      setRemainingReps(remainingReps - 1);
      engageWork();
    } else if (currStatus === "rest") {
      setRemainingReps(repetitions);
      engageWork();
    }

    setIsAwait(false);
    console.log(remainingReps);
  }

  const variants = {
    running: {
      scale: 1.1,
      textShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: 50,
    },
    stopped: {
      scale: 1,
      textShadow: "",
    },
  };

  return (
    <div>
      <div className="relative flex flex-col ">
        <CircularProgressBar
          progress={
            currStatus === "work"
              ? 1 - runTimeInSeconds / workTime
              : currStatus === "break"
                ? 1 - runTimeInSeconds / breakTime
                : 1 - runTimeInSeconds / restTime
          }
          className="absolute self-center drop-shadow-[0_2px_3px_#857F72]"
        />
        <div className="relative z-20 mx-auto my-8 flex h-64 w-64 flex-col justify-around gap-4 rounded-full">
          <motion.button
            className="bg-standard-primary dark:bg-standard-darkprimary text-standard-900 h-8 w-fit self-center rounded-full px-2 disabled:bg-gray-600 disabled:text-gray-400"
            disabled={isRunning}
            onClick={() => {
              isAwait ? nextPhase() : reset();
            }}
            whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={
              !isRunning
                ? { scale: 1.05, boxShadow: "4px 4px 0 rgba(0,0,0,0.2)" }
                : {}
            }
          >
            {isAwait ? "Confirm" : "Reset"}
          </motion.button>
          <motion.div
            variants={variants}
            animate={isRunning ? "running" : "stopped"}
            className="w-fit self-center "
          >
            <Timer
              className="w-fit self-center  text-center align-middle text-6xl"
              remainingSeconds={runTimeInSeconds}
            ></Timer>
          </motion.div>
          <motion.button
            className="bg-standard-primary dark:bg-standard-darkprimary container w-16 self-center rounded-full px-4 py-2 disabled:text-gray-400"
            onClick={() => setIsRunning(!isRunning)}
            disabled={isAwait}
            whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.05, boxShadow: "4px 4px 0 rgba(0,0,0,0.2)" }}
          >
            {isRunning ? (
              <FaPause className="mx-auto" />
            ) : (
              <FaPlay className="mx-auto" />
            )}
          </motion.button>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="WorkTime">Work Time:</label>
          <select
            name="Work Time"
            id="WorkTime"
            defaultValue={1500}
            disabled={isRunning}
            onChange={(e) => {
              const time = parseInt(e.currentTarget.value);
              setWorkTime(time);
              // Calling reset() here causes a delay in action
              // e.g. if 30 is selected and the time is changed to 25, the timer
              // registers the change to the previous value
              setRunTimeInSeconds(time);
              setRemainingReps(repetitions);
            }}
          >
            <option value={1200}>20 Min</option>
            <option value={1500}>25 Min</option>
            <option value={1800}>30 Min</option>
          </select>
        </div>
        <div>
          <label htmlFor="breakTime">Break Time:</label>
          <select
            name="Break Time"
            id="breakTime"
            defaultValue={300}
            disabled={isRunning}
            onChange={(e) => {
              const time = parseInt(e.currentTarget.value);
              setBreakTime(time);
              reset();
            }}
          >
            <option value={300}>5 Min</option>
            <option value={600}>10 Min</option>
          </select>
        </div>
        <div>
          <label htmlFor="repetitions">Repetitions before rest:</label>
          <select
            name="Repetitions before Rest"
            id="Repetitions"
            defaultValue={4}
            disabled={isRunning}
            onChange={(e) => {
              const num = parseInt(e.currentTarget.value);
              setRepetitions(num);
              setRemainingReps(repetitions);
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label htmlFor="restTime">Rest Time</label>
          <select
            name="Rest Time"
            id="restTime"
            defaultValue={2}
            disabled={isRunning}
            onChange={(e) => {
              const num = parseInt(e.currentTarget.value);
              setRestTime(num);
              reset();
            }}
          >
            <option value={1}>15 Min</option>
            <option value={2}>30 Min</option>
            <option value={3}>60 Min</option>
          </select>
        </div>
        <p>Remaining Repetitions: {remainingReps}</p>
      </div>

      <br />
      <strong>Testing UI</strong>
      <br />
      <button
        className="border-standard-900 m-2 rounded-md border p-2"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
      <button
        className="border-standard-900 rounded-md border p-2"
        onClick={() => setRunTimeInSeconds(1)}
      >
        DEV BUTTON
      </button>
      <br />
      <p>Running: {isRunning.toString()}</p>
      <p>State: {currStatus}</p>
    </div>
  );
}
