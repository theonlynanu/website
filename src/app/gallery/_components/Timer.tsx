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
    <div className={className}>
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}
