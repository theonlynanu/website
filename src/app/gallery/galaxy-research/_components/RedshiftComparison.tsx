import Image from "next/image";

interface Sample {
  z: string;
  src: string;
}

const SAMPLES: Sample[] = [
  { z: "0.01", src: "/research/redshift-z001.jpg" },
  { z: "0.05", src: "/research/redshift-z005.jpg" },
  { z: "0.10", src: "/research/redshift-z010.jpg" },
  { z: "0.15", src: "/research/redshift-z015.jpg" },
];

export default function RedshiftComparison() {
  return (
    <figure className="mx-auto my-8 w-full max-w-3xl px-4">
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {SAMPLES.map((s) => (
          <div key={s.z} className="flex flex-col items-center">
            <div className="relative aspect-square w-full overflow-hidden rounded bg-black">
              <Image
                src={s.src}
                alt={`A galaxy of the same morphological class observed at z ≈ ${s.z}`}
                fill
                sizes="(min-width: 768px) 180px, 25vw"
                className="object-cover"
              />
            </div>
            <div className="text-standard-700 dark:text-standard-300 mt-2 font-mono text-xs">
              z ≈ {s.z}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-standard-700 dark:text-standard-300 mt-3 text-center text-xs italic">
        Four spiral galaxies observed at increasing redshift. The galaxy
        that&apos;s crisp and well-resolved at z ≈ 0.01 becomes progressively
        fainter, and softer — and by z ≈ 0.15, features that cleanly
        distinguished its class are often ambiguous. As the distance increases,
        the chance of occlusion and artifacting from other bodies also increases
        considerably.
      </figcaption>
    </figure>
  );
}
