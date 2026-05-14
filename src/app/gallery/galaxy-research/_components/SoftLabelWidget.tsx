"use client";

import { useState } from "react";
import Image from "next/image";

const LABELS = [
  "Elliptical",
  "Edge-on disk",
  "Face-on spiral",
  "Face-on non-spiral",
];

// Branch-product vote fractions for galaxy 254607, computed from the raw
// debiased GZ2 vote fractions and renormalized to sum to 1.
const SOFT = [0.016, 0.0, 0.491, 0.493];
// argmax of SOFT → face-on non-spiral (just barely)
const HARD = [0, 0, 0, 1];

const BAR_AREA_W = 240;
const LABEL_W = 130;
const VALUE_W = 50;
const TOTAL_W = LABEL_W + BAR_AREA_W + VALUE_W;
const ROW_H = 38;
const TOP_PAD = 16;
const HEIGHT = TOP_PAD + LABELS.length * ROW_H + 12;

type Mode = "soft" | "hard";

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
        active
          ? "bg-standard-confirm text-white dark:bg-standard-darkconfirm"
          : "text-standard-900 hover:bg-standard-200 dark:text-standard-100 dark:hover:bg-standard-700"
      }`}
    >
      {children}
    </button>
  );
}

export default function SoftLabelWidget() {
  const [mode, setMode] = useState<Mode>("soft");
  const values = mode === "soft" ? SOFT : HARD;

  return (
    <figure className="mx-auto my-8 w-full max-w-3xl px-4">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[200px_1fr]">
        {/* Galaxy image */}
        <div className="mx-auto">
          <Image
            src="/research/galaxy-254607.jpg"
            alt="Galaxy 254607, an ambiguous case where annotators were nearly evenly split between face-on spiral and face-on non-spiral"
            width={200}
            height={200}
            className="rounded"
          />
          <p className="mt-2 text-center text-xs italic text-standard-700 dark:text-standard-300">
            Galaxy 254607
            <br />
            (34 annotators)
          </p>
        </div>

        {/* Toggle + bar chart */}
        <div>
          <div className="mb-3 inline-flex gap-1 rounded-lg border border-standard-300 p-1 dark:border-standard-600">
            <ToggleButton
              active={mode === "soft"}
              onClick={() => setMode("soft")}
            >
              Vote distribution (soft)
            </ToggleButton>
            <ToggleButton
              active={mode === "hard"}
              onClick={() => setMode("hard")}
            >
              Majority vote (hard)
            </ToggleButton>
          </div>

          <svg
            viewBox={`0 0 ${TOTAL_W} ${HEIGHT}`}
            className="w-full"
            role="img"
            aria-label={`Bar chart of ${mode} label for galaxy 254607`}
          >
            {/* Y-axis */}
            <line
              x1={LABEL_W}
              y1={TOP_PAD - 4}
              x2={LABEL_W}
              y2={HEIGHT - 8}
              stroke="currentColor"
              strokeWidth="1"
              className="text-standard-500"
              opacity="0.5"
            />

            {LABELS.map((label, i) => {
              const y = TOP_PAD + i * ROW_H;
              const v = values[i];
              const width = v * BAR_AREA_W;
              return (
                <g key={label}>
                  <text
                    x={LABEL_W - 8}
                    y={y + ROW_H / 2}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="12"
                    className="fill-standard-900 dark:fill-standard-100"
                  >
                    {label}
                  </text>
                  <rect
                    x={LABEL_W}
                    y={y + 6}
                    width={width}
                    height={ROW_H - 14}
                    rx="2"
                    fill="#1D9E75"
                    opacity="0.85"
                    style={{ transition: "width 600ms ease-out" }}
                  />
                  <text
                    x={LABEL_W + width + 6}
                    y={y + ROW_H / 2}
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="500"
                    fontFamily="monospace"
                    className="fill-standard-900 dark:fill-standard-100"
                    style={{ transition: "x 600ms ease-out" }}
                  >
                    {v.toFixed(3)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-relaxed text-standard-900 dark:text-standard-100">
        Under <strong>majority vote</strong>, the model is told this galaxy is
        definitively face-on non-spiral — even though it won by just two
        thousandths of the vote. Under <strong>vote distribution</strong>, it
        learns what humans actually saw: a genuine 49/49 split between spiral
        and non-spiral, with virtually no signal for the other two classes.
        Soft-label training preserves that disagreement; hard-label training
        discards it.
      </figcaption>
    </figure>
  );
}
