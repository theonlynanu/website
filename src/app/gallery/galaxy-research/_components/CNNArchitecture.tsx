type LayerStyle = "input" | "conv" | "pool" | "output";

interface Layer {
  id: string;
  name: string;
  spatial: number;
  channels: number;
  operation: string | null;
  params: string;
  w: number;
  h: number;
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
    w: 48,
    h: 48,
    style: "input",
  },
  {
    id: "stem",
    name: "Stem",
    spatial: 112,
    channels: 32,
    operation: "7x7 conv, stride 2",
    params: "~5K",
    w: 24,
    h: 30,
    style: "conv",
  },
  {
    id: "b1",
    name: "Block 1",
    spatial: 56,
    channels: 64,
    operation: "2 convs, second stride 2",
    params: "~55K",
    w: 35,
    h: 22,
    style: "conv",
  },
  {
    id: "b2",
    name: "Block 2",
    spatial: 28,
    channels: 128,
    operation: "2 convs, second stride 2",
    params: "~221K",
    w: 50,
    h: 15,
    style: "conv",
  },
  {
    id: "b3",
    name: "Block 3",
    spatial: 14,
    channels: 192,
    operation: "2 convs, second stride 2",
    params: "~552K",
    w: 65,
    h: 11,
    style: "conv",
  },
  {
    id: "b4",
    name: "Block 4",
    spatial: 7,
    channels: 256,
    operation: "2 convs, second stride 2",
    params: "~1.0M",
    w: 80,
    h: 8,
    style: "conv",
  },
  {
    id: "gap",
    name: "GAP",
    spatial: 1,
    channels: 256,
    operation: "global average pool",
    params: "—",
    w: 80,
    h: 3,
    style: "pool",
  },
  {
    id: "out",
    name: "Output",
    spatial: 1,
    channels: 4,
    operation: "dropout + linear",
    params: "~1K",
    w: 12,
    h: 3,
    style: "output",
  },
];

const STYLE_FILL: Record<LayerStyle, React.SVGAttributes<SVGRectElement>> = {
  input: {
    fill: "none",
    stroke: "#0B5F45",
    strokeWidth: 1.5,
  },
  conv: {
    fill: "#1D9E75",
    fillOpacity: 0.78,
    stroke: "#0B5F45",
    strokeWidth: 1,
  },
  pool: {
    fill: "#1D9E75",
    fillOpacity: 0.45,
    stroke: "#0B5F45",
    strokeWidth: 1,
    strokeDasharray: "3 2",
  },
  output: {
    fill: "#FCDE5A",
    stroke: "#8B6914",
    strokeWidth: 1,
  },
};

function LayerViz({ layer }: { layer: Layer }) {
  const rectProps = STYLE_FILL[layer.style];
  return (
    <svg
      viewBox="0 0 100 50"
      width="100"
      height="50"
      className="block"
      aria-hidden="true"
    >
      <rect
        x={50 - layer.w / 2}
        y={25 - layer.h / 2}
        width={layer.w}
        height={layer.h}
        rx="1.5"
        {...rectProps}
      />
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

export default function CNNArchitecture() {
  return (
    <figure className="mx-auto my-8 w-full max-w-2xl px-4">
      <div>
        {LAYERS.map((layer, i) => (
          <div key={layer.id}>
            {/* Layer row */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-3 py-1 md:grid-cols-[120px_1fr] md:gap-4">
              <div className="flex justify-center">
                <LayerViz layer={layer} />
              </div>
              <div>
                <div className="text-standard-900 dark:text-standard-100 text-sm font-semibold">
                  {layer.name}
                </div>
                <div className="text-standard-700 dark:text-standard-300 font-mono text-xs">
                  {layer.spatial > 1
                    ? `${layer.spatial}x${layer.spatial}x${layer.channels}`
                    : `${layer.channels}-vector`}
                  {layer.params !== "—" && (
                    <span className="text-standard-600 dark:text-standard-400 ml-2">
                      {layer.params} parameters
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Connector to next layer */}
            {i < LAYERS.length - 1 && (
              <div className="grid grid-cols-[100px_1fr] items-center gap-3 md:grid-cols-[120px_1fr] md:gap-4">
                <div className="flex justify-center">
                  <ArrowDown />
                </div>
                <div className="text-standard-700 dark:text-standard-300 text-xs italic">
                  {LAYERS[i + 1].operation}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-standard-700 dark:text-standard-300 mt-5 text-center text-sm">
        <span className="font-semibold">~1.87M</span> parameters total
      </div>

      <figcaption className="text-standard-700 dark:text-standard-300 mt-3 text-center text-xs italic">
        Each rectangle&apos;s height encodes the spatial size of the feature
        map; width encodes the channel count. The data shrinks spatially and
        deepens in channels through the network, then collapses to four class
        scores.
      </figcaption>
    </figure>
  );
}
