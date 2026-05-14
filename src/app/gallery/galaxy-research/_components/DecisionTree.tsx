interface LeafNode {
  type: "leaf";
  answer: string;
  name: string;
  formula: string;
}

interface BranchNode {
  type: "branch";
  answer: string;
  child: QuestionNode;
}

interface QuestionNode {
  task: string;
  question: string;
  options: (LeafNode | BranchNode)[];
}

const TREE: QuestionNode = {
  task: "T01",
  question: "Is the galaxy smooth or featured?",
  options: [
    {
      type: "leaf",
      answer: "smooth",
      name: "Elliptical",
      formula: "p(smooth)",
    },
    {
      type: "branch",
      answer: "featured",
      child: {
        task: "T02",
        question: "Is the disk seen edge-on?",
        options: [
          {
            type: "leaf",
            answer: "yes",
            name: "Edge-on disk",
            formula: "p(featured) × p(edge-on)",
          },
          {
            type: "branch",
            answer: "no",
            child: {
              task: "T04",
              question: "Is there a spiral pattern?",
              options: [
                {
                  type: "leaf",
                  answer: "spiral",
                  name: "Face-on spiral",
                  formula: "p(featured) × p(not edge-on) × p(spiral)",
                },
                {
                  type: "leaf",
                  answer: "no spiral",
                  name: "Face-on non-spiral",
                  formula: "p(featured) × p(not edge-on) × p(no spiral)",
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

const ANSWER_PILL_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(0, 143, 86, 0.15)",
  color: "#008F56",
};

function AnswerPill({ answer }: { answer: string }) {
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 font-mono text-xs font-semibold"
      style={ANSWER_PILL_STYLE}
    >
      {answer}
    </span>
  );
}

function TaskBadge({ task }: { task: string }) {
  return (
    <span className="bg-standard-200 text-standard-700 dark:bg-standard-700 dark:text-standard-300 rounded px-1.5 py-0.5 font-mono text-xs">
      {task}
    </span>
  );
}

function Leaf({ data }: { data: LeafNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-1">
      <AnswerPill answer={data.answer} />
      <span className="text-standard-700 dark:text-standard-300 text-xs">
        →
      </span>
      <span className="text-standard-900 dark:text-standard-100 font-semibold">
        {data.name}
      </span>
      <div className="text-standard-700 dark:text-standard-300 basis-full font-mono text-xs">
        P = {data.formula}
      </div>
    </div>
  );
}

function Branch({ data }: { data: BranchNode }) {
  return (
    <div className="py-1">
      <div className="mb-2">
        <AnswerPill answer={data.answer} />
      </div>
      <Question data={data.child} />
    </div>
  );
}

function Question({ data }: { data: QuestionNode }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <TaskBadge task={data.task} />
        <span className="text-standard-900 dark:text-standard-100 font-medium">
          {data.question}
        </span>
      </div>
      <div className="border-standard-300 dark:border-standard-700 ml-2 space-y-3 border-l-2 pl-4">
        {data.options.map((opt, i) =>
          opt.type === "leaf" ? (
            <Leaf key={i} data={opt} />
          ) : (
            <Branch key={i} data={opt} />
          )
        )}
      </div>
    </div>
  );
}

export default function DecisionTree() {
  return (
    <figure className="mx-auto my-8 w-full max-w-3xl px-4">
      <div className="border-standard-300 bg-standard-100/40 dark:border-standard-700 dark:bg-standard-800/40 rounded-lg border p-5">
        <Question data={TREE} />
      </div>
      <figcaption className="text-standard-700 dark:text-standard-300 mt-3 text-center text-xs italic">
        Each path through the tree defines one class; multiplying the vote
        fractions along that path gives the soft target used in Project 1.
      </figcaption>
    </figure>
  );
}
