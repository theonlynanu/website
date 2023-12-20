export default function Timer({
  remainingSeconds,
  className,
}: {
  remainingSeconds: number;
  className: string;
}) {
  const minutes = ~~(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div
      className={`${className} text-standard-800 dark:text-standard-200 px-4`}
    >
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}
