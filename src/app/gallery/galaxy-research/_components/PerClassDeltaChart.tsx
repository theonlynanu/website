export default function PerClassDeltaChart() {
  const data = [
    { name: "Elliptical", delta: 9.74 },
    { name: "Edge-on disk", delta: -2.02 },
    { name: "Face-on spiral", delta: 0.83 },
    { name: "Face-on non-spiral", delta: -9.31 },
  ];

  const maxAbs = 12;
  const barAreaWidth = 220;
  const labelWidth = 130;
  const valueWidth = 60;
  const totalWidth = labelWidth + barAreaWidth + valueWidth;
  const rowHeight = 44;
  const topPad = 40;
  const bottomPad = 16;
  const height = topPad + data.length * rowHeight + bottomPad;
  const zeroX = labelWidth + barAreaWidth / 2;
  const pxPerUnit = barAreaWidth / 2 / maxAbs;

  return (
    <figure className="mx-auto my-8 w-full max-w-xl">
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full"
        role="img"
        aria-label="Per-class accuracy change from cross-entropy to KL-divergence training"
      >
        <text
          x={totalWidth / 2}
          y={20}
          textAnchor="middle"
          className="fill-standard-900 dark:fill-standard-100"
          fontSize="13"
          fontWeight="500"
        >
          Per-class accuracy change (CE{"->"}KL), percentage points
        </text>

        <line
          x1={zeroX}
          y1={topPad - 6}
          x2={zeroX}
          y2={height - bottomPad}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />

        {data.map((d, i) => {
          const y = topPad + i * rowHeight;
          const barY = y + 8;
          const barH = rowHeight - 16;
          const w = Math.abs(d.delta) * pxPerUnit;
          const x = d.delta >= 0 ? zeroX : zeroX - w;
          const positive = d.delta >= 0;
          const valueX = positive ? zeroX + w + 8 : zeroX - w - 8;
          const valueAnchor = positive ? "start" : "end";
          return (
            <g key={d.name} className="my-32">
              <text
                x={labelWidth - 16}
                y={y + rowHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-standard-900 dark:fill-standard-100"
                fontSize={12}
              >
                {d.name}
              </text>
              <rect
                x={x}
                y={barY}
                width={w}
                height={barH}
                rx="2"
                className={
                  positive
                    ? "fill-standard-confirm dark:fill-standard-darkconfirm"
                    : "fill-standard-delete dark:fill-standard-darkdelete"
                }
                opacity={0.85}
              />
              <text
                x={valueX}
                y={y + rowHeight / 2}
                textAnchor={valueAnchor}
                dominantBaseline="middle"
                className="fill-standard-900 dark:fill-standard-100"
                fontSize={12}
                fontWeight={500}
              >
                {d.delta > 0 ? "+" : ""}
                {d.delta.toFixed(2)}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
        Soft-label training improves elliptical and face-on spiral accuracy, but
        at the cost of face-on non-spirals and edge-on disks. The aggregate
        +3.4% gain hides a directional shift, not a uniform improvement.
      </figcaption>
    </figure>
  );
}
