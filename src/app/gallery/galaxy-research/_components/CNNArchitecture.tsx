import React from "react";

type LayerStyle = "input" | "conv" | "pool";

interface Layer {
  id: string;
  name: string;
  spatial: number;
  channels: number;
  operation: string | null;
  params: string;
  side: number; // visual side length of the spatial (front) face
  depth: number; // visual depth — encodes channel count
  style: LayerStyle;
}

const LAYERS: Layer[] = [
  {
    id: "input",
    name: "Input",
    spatial: 224,
    channels: 3,
    operation: null,
    params: "—",
    side: 20,
    depth: 3,
    style: "input",
  },
  {
    id: "stem",
    name: "Stem",
    spatial: 112,
    channels: 32,
    operation: "7×7 conv, stride 2",
    params: "~5K",
    side: 17,
    depth: 9,
    style: "conv",
  },
  {
    id: "b1",
    name: "Block 1",
    spatial: 56,
    channels: 64,
    operation: "2 convs, second stride 2",
    params: "~55K",
    side: 14,
    depth: 13,
    style: "conv",
  },
  {
    id: "b2",
    name: "Block 2",
    spatial: 28,
    channels: 128,
    operation: "2 convs, second stride 2",
    params: "~221K",
    side: 11,
    depth: 17,
    style: "conv",
  },
  {
    id: "b3",
    name: "Block 3",
    spatial: 14,
    channels: 192,
    operation: "2 convs, second stride 2",
    params: "~552K",
    side: 8,
    depth: 20,
    style: "conv",
  },
  {
    id: "b4",
    name: "Block 4",
    spatial: 7,
    channels: 256,
    operation: "2 convs, second stride 2",
    params: "~1.0M",
    side: 5,
    depth: 24,
    style: "conv",
  },
  {
    id: "gap",
    name: "GAP",
    spatial: 1,
    channels: 256,
    operation: "global average pool",
    params: "—",
    side: 2.5,
    depth: 24,
    style: "pool",
  },
];

const CLASSES = [
  "Elliptical",
  "Edge-on disk",
  "Face-on spiral",
  "Face-on non-spiral",
];

const FINAL_OP = "dropout + linear";

// Oblique projection ratios — control how far the depth axis extends
// up-and-right from the front face.
const DX_RATIO = 0.55;
const DY_RATIO = 0.35;

type FaceStyle = React.SVGAttributes<SVGPathElement>;

interface CuboidStyle {
  front: FaceStyle;
  top: FaceStyle;
  right: FaceStyle;
}

const STYLE_FACES: Record<LayerStyle, CuboidStyle> = {
  // Same green as conv, but very faint — reads as "same kind of object, less
  // committed", i.e. data flowing in rather than a learned layer.
  input: {
    front: {
      fill: "#1D9E75",
      fillOpacity: 0.1,
      stroke: "#0B5F45",
      strokeWidth: 0.7,
    },
    top: {
      fill: "#1D9E75",
      fillOpacity: 0.07,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
    right: {
      fill: "#1D9E75",
      fillOpacity: 0.05,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
  },
  conv: {
    front: {
      fill: "#1D9E75",
      fillOpacity: 0.88,
      stroke: "#0B5F45",
      strokeWidth: 0.7,
    },
    top: {
      fill: "#1D9E75",
      fillOpacity: 0.58,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
    right: {
      fill: "#1D9E75",
      fillOpacity: 0.35,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
  },
  // Dashed on the front face only; top/right stay solid at reduced opacity so
  // seams between faces don't fight each other visually.
  pool: {
    front: {
      fill: "#1D9E75",
      fillOpacity: 0.4,
      stroke: "#0B5F45",
      strokeWidth: 0.7,
      strokeDasharray: "1.4 1",
    },
    top: {
      fill: "#1D9E75",
      fillOpacity: 0.25,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
    right: {
      fill: "#1D9E75",
      fillOpacity: 0.15,
      stroke: "#0B5F45",
      strokeWidth: 0.5,
    },
  },
};

type Point = readonly [number, number];

function pathFromPoints(points: Point[]): string {
  return (
    points
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`
      )
      .join(" ") + " Z"
  );
}

function LayerCuboid({ layer }: { layer: Layer }) {
  const { side, depth } = layer;
  const dx = depth * DX_RATIO;
  const dy = depth * DY_RATIO;

  // ViewBox is 40x26. Anchor the visual centroid near (20, 13) so cuboids
  // stay horizontally centered as their proportions shift across layers.
  const frontCx = 20 - dx / 2;
  const frontCy = 13 + dy / 2;
  const fx = frontCx - side / 2;
  const fy = frontCy - side / 2;

  const F_TL: Point = [fx, fy];
  const F_TR: Point = [fx + side, fy];
  const F_BL: Point = [fx, fy + side];
  const F_BR: Point = [fx + side, fy + side];
  const B_TL: Point = [fx + dx, fy - dy];
  const B_TR: Point = [fx + side + dx, fy - dy];
  const B_BR: Point = [fx + side + dx, fy + side - dy];

  // Draw order: back faces first (top, right), front face last on top.
  const topPath = pathFromPoints([F_TL, B_TL, B_TR, F_TR]);
  const rightPath = pathFromPoints([F_TR, B_TR, B_BR, F_BR]);
  const frontPath = pathFromPoints([F_TL, F_TR, F_BR, F_BL]);

  const faces = STYLE_FACES[layer.style];

  return (
    <svg
      viewBox="0 0 40 26"
      width="110"
      height="71.5"
      className="block max-w-full"
      aria-hidden="true"
    >
      <path d={topPath} {...faces.top} />
      <path d={rightPath} {...faces.right} />
      <path d={frontPath} {...faces.front} />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 12 18"
      width="12"
      height="18"
      className="block"
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="0"
        x2="6"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-standard-500"
      />
      <polygon points="2,10 10,10 6,17" className="fill-standard-500" />
    </svg>
  );
}

// A shallow cuboid rendered in the same isometric style as the layer stack
// above, but with depth ≈ 0 so it reads as "collapsed" — the pipeline's
// 256-channel vector has become a single scalar score for one class.
function ClassBin({ label }: { label: string }) {
  const side = 18;
  const depth = 2.5;
  const dx = depth * DX_RATIO;
  const dy = depth * DY_RATIO;

  // Centered in a 32x24 viewBox with the same centroid trick as LayerCuboid.
  const frontCx = 16 - dx / 2;
  const frontCy = 12 + dy / 2;
  const fx = frontCx - side / 2;
  const fy = frontCy - side / 2;

  const F_TL: Point = [fx, fy];
  const F_TR: Point = [fx + side, fy];
  const F_BL: Point = [fx, fy + side];
  const F_BR: Point = [fx + side, fy + side];
  const B_TL: Point = [fx + dx, fy - dy];
  const B_TR: Point = [fx + side + dx, fy - dy];
  const B_BR: Point = [fx + side + dx, fy + side - dy];

  const topPath = pathFromPoints([F_TL, B_TL, B_TR, F_TR]);
  const rightPath = pathFromPoints([F_TR, B_TR, B_BR, F_BR]);
  const frontPath = pathFromPoints([F_TL, F_TR, F_BR, F_BL]);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 32 24"
        width="48"
        height="36"
        className="block"
        aria-hidden="true"
      >
        <path d={topPath} fill="#F4C542" stroke="#8B6914" strokeWidth="0.5" />
        <path d={rightPath} fill="#D9A82F" stroke="#8B6914" strokeWidth="0.5" />
        <path d={frontPath} fill="#FCDE5A" stroke="#8B6914" strokeWidth="0.7" />
      </svg>
      <div className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs leading-tight">
        {label}
      </div>
    </div>
  );
}

export default function CNNArchitecture() {
  return (
    <figure className="mx-auto my-8 w-full max-w-2xl px-4">
      <div>
        {LAYERS.map((layer, i) => {
          const nextOp = i + 1 < LAYERS.length ? LAYERS[i + 1].operation : null;
          return (
            <React.Fragment key={layer.id}>
              {/* Layer row */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3 py-1 md:grid-cols-[130px_1fr] md:gap-4">
                <div className="flex justify-center">
                  <LayerCuboid layer={layer} />
                </div>
                <div>
                  <div className="text-standard-900 dark:text-standard-100 text-sm font-semibold">
                    {layer.name}
                  </div>
                  <div className="text-standard-700 dark:text-standard-300 font-mono text-xs">
                    {layer.spatial > 1
                      ? `${layer.spatial}×${layer.spatial}×${layer.channels}`
                      : `${layer.channels}×1 vector`}
                    {layer.params !== "—" && (
                      <span className="text-standard-600 dark:text-standard-400 ml-2">
                        {layer.params}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector between layers (only rendered between real layers,
                  not after the last one — the connector into the output band
                  is rendered separately below so its label can be anchored to
                  the Output header). */}
              {nextOp && (
                <div className="grid grid-cols-[110px_1fr] items-center gap-3 md:grid-cols-[130px_1fr] md:gap-4">
                  <div className="flex justify-center">
                    <ArrowDown />
                  </div>
                  <div className="text-standard-700 dark:text-standard-300 text-xs italic">
                    {nextOp}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Connector into the output band. The arrow sits under the GAP
            column so the pipeline still visually flows into the Output
            header below. */}
        <div className="grid grid-cols-[110px_1fr] items-center gap-3 md:grid-cols-[130px_1fr] md:gap-4">
          <div className="flex justify-center">
            <ArrowDown />
          </div>
          <div />
        </div>

        {/* Output band — the column-locked pattern breaks here, signaling
            the transition from feature maps to discrete class scores. */}
        <div className="mt-2">
          <div className="text-standard-900 dark:text-standard-100 text-center text-sm font-semibold">
            Output
          </div>
          <div className="text-standard-700 dark:text-standard-300 mt-0.5 text-center text-xs italic">
            {FINAL_OP}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
            {CLASSES.map((c) => (
              <ClassBin key={c} label={c} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-standard-700 dark:text-standard-300 mt-6 text-center text-sm">
        <span className="font-semibold">~1.87M</span> parameters total
      </div>

      <figcaption className="text-standard-700 dark:text-standard-300 mt-3 text-center text-xs italic">
        Each stage&apos;s front face encodes spatial size; depth encodes channel
        count. The data shrinks spatially and deepens in channels through the
        network, then collapses through global average pooling and a linear
        layer into a score for each of the four morphological classes.
      </figcaption>
    </figure>
  );
}
