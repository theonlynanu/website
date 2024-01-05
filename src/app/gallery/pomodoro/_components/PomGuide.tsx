"use client";
import clsx from "clsx";
import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { motion } from "framer-motion";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
  TbHexagonNumber5,
  TbHexagonNumber6,
} from "react-icons/tb";
import { GiTomato } from "react-icons/gi";

export default function PomGuide() {
  const [infoVisible, setInfoVisible] = useState(false);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        bounce: 0,
        staggerChildren: 0.03,
      },
    },
    invisible: {
      opacity: 0,
      transition: {
        duration: 0,
        when: "afterChildren",
      },
    },
  };
  const children = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
    invisible: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0,
      },
    },
  };
  return (
    <>
      <button
        className="mb-2 flex flex-row gap-2 text-xl font-bold"
        onClick={() => setInfoVisible(!infoVisible)}
      >
        Unsure how to use this timer?
        {infoVisible ? (
          <IoIosArrowDropupCircle className="h-6 self-center" />
        ) : (
          <IoIosArrowDropdownCircle className="h-6 self-center" />
        )}
      </button>
      <motion.div
        className={clsx(
          "mx-4 mb-4 flex flex-col gap-2",
          infoVisible ? "" : "h-4 content-none"
        )}
        animate={infoVisible ? "visible" : "invisible"}
        variants={list}
        initial={{ opacity: 0 }}
      >
        <div className="mx-4 w-fit">
          The Pomodoro Technique is a time management method, one that I use
          pretty often when I want to focus on a given set of tasks. I find it
          really works quite well for me! Here's how it works.
        </div>
        <motion.div className="w-fit" variants={children}>
          <TbHexagonNumber1 className="inline h-6 w-6" /> Select a task or list
          of tasks to work on
        </motion.div>
        <motion.div className="w-fit" variants={children}>
          <TbHexagonNumber2 className="inline h-6 w-6" /> <strong>Work</strong>{" "}
          for 25 minutes. Take care to avoid distractions and maximize your
          concentration
        </motion.div>
        <motion.div className="w-fit " variants={children}>
          <TbHexagonNumber3 className="inline h-6 w-6" /> Take a five minute
          <strong> break</strong>. No sneaking in any work!
        </motion.div>
        <motion.div className="w-fit " variants={children}>
          <TbHexagonNumber4 className="inline h-6 w-6" /> One of these
          work-break cycles is referred to as one <strong>Pomodoro </strong>
          <GiTomato className="inline text-red-700" />
        </motion.div>
        <motion.div className="w-fit " variants={children}>
          <TbHexagonNumber5 className="inline h-6 w-6" /> After four{" "}
          <strong>Pomodoros </strong>
          <GiTomato className="inline text-red-700" />, take a longer{" "}
          <strong>rest</strong> of 30 minutes.
        </motion.div>
        <motion.div className="w-fit " variants={children}>
          <TbHexagonNumber6 className="inline h-6 w-6" /> Repeat until you're
          done your work! You can measure the time each task took to complete by
          counting the <strong>Pomodoros </strong>
          <GiTomato className="inline text-red-700" /> that it took! Each pom is
          a 30 minute block, and each full cycle is an hour!
        </motion.div>
      </motion.div>
    </>
  );
}
