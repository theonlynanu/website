import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { montaga } from "../../../fonts";
import PaperPreview from "../_components/PaperPreview";
import PerClassDeltaChart from "./_components/PerClassDeltaChart";
import DecisionTree from "./_components/DecisionTree";
import CNNArchitecture from "./_components/CNNArchitecture";
import SoftLabelWidget from "./_components/SoftLabelWidget";
import RedshiftComparison from "./_components/RedshiftComparison";

export const metadata: Metadata = {
  title: "Galaxy Morphology Research",
  description:
    "Two studies on automated galaxy morphology classification: training with human disagreement and degradation under observational domain shift.",
};

const linkClass =
  "text-standard-900 dark:text-standard-100 border-2 rounded-xl px-2 py-1 hover:bg-standard-200 dark:hover:bg-standard-800 hover:underline text-lg";

const sectionH2 = (extra = "") =>
  `mx-8 mb-3 mt-12 text-3xl ${montaga.className} ${extra}`;

const sectionH3 = (extra = "") =>
  `mx-8 mb-3 mt-12 text-2xl ${montaga.className} ${extra}`;

const proseP =
  "mx-8 my-4 text-base max-w-2xl leading-relaxed md:mx-12 md:text-lg";

export default function Index() {
  return (
    <div className="pb-16">
      <header className="mx-8 mt-6 md:mx-8">
        <h1 className={`text-5xl ${montaga.className}`}>
          Galaxy Morphology Research
        </h1>
        <p className="text-standard-700 dark:text-standard-300 mx-4 mt-2 text-base md:text-lg">
          Two projects on automated classification of galaxy images using the
          GalaxyZoo2 dataset.
        </p>

        <h4 className="text-standard-500 mx-4 mt-4 text-lg">Jump to section</h4>
        <nav className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#foundations" className={linkClass}>
            Foundations
          </a>
          <a href="#soft-labels" className={linkClass}>
            Soft vs. hard labels
          </a>
          <a href="#domain-shift" className={linkClass}>
            Domain shift
          </a>
          <a href="#resources" className={linkClass}>
            Resources
          </a>
        </nav>
      </header>

      <section className="mt-8">
        <p className={proseP}>
          This line of research specifically investigates the use of
          convolutional neural networks (CNNs) on galaxy
          morphology-classification tasks. In particular, the first analyzes the
          effects of using human disagreement data as a training target, while
          the second looks at how models trained on nearby galaxies perform when
          tested on much more distant ones.
        </p>
        <p className={proseP}>
          Because they share so much machinery, I&apos;ve put them on a single
          page. The Foundations section below covers the structure and nature of
          the GZ2 dataset, as well as the model architecture I used. Each
          project section then focuses on what changed and what happened. Both
          papers are available in full at the bottom.
        </p>
      </section>

      {/* ─── Foundations ──────────────────────────────────────────────── */}
      <section id="foundations" className="scroll-mt-24">
        <h2 className={sectionH2()}>Foundations</h2>

        <h3 className={sectionH3()}>The dataset: GalaxyZoo2</h3>
        <p className={proseP}>
          GalaxyZoo2 is a citizen-science dataset of roughly 240,000 galaxy
          images from the Sloan Digital Sky Survey. Each galaxy was shown to
          many volunteers who answered a tree of yes/no questions about its
          appearance — &ldquo;is it smooth or featured?&rdquo;, &ldquo;is the
          disk seen edge-on?&rdquo;, &ldquo;is there a spiral pattern?&rdquo;
          and so on. Instead of a single label, every galaxy comes with a
          distribution of votes across the tree.
        </p>
        <p className={proseP}>
          For both projects, I collapsed the 37-node tree into four classes
          defined by the presence of distinct visual features:{" "}
          <em>Elliptical</em> (smooth, featureless blobs), <em>Edge-on disk</em>{" "}
          (disks seen from the side), <em>Face-on spiral</em> (clear spiral
          arms), and <em>Face-on non-spiral</em> (featured but without visible
          spiral structure). I dropped galaxies where no class got more than 70%
          of the vote, leaving about 178,000 confidently-labeled galaxies.
        </p>

        {/* ─── Interactive widget 1: GZ2 decision tree ──────────────── */}
        <DecisionTree />

        <h3 className={sectionH3()}>The model: a compact CNN</h3>
        <p className={proseP}>
          Both projects use the same convolutional neural network, designed to
          be small enough that any difference in behavior between training
          regimes can plausibly be attributed to the training setup itself,
          rather than to model architecture or hyperparameter choices. It has
          about 1.87 million parameters, takes a 224×224 RGB image as input, and
          produces four output scores — one per class. No skip connections, no
          fancy attention, no pretraining: just a stack of convolutions, batch
          normalization, and ReLU activations, ending in global average pooling
          and a single linear layer.
        </p>

        {/* ─── Interactive widget 2: CNN architecture ───────────────── */}
        <CNNArchitecture />

        <p className={proseP}>
          Training used AdamW, cosine learning rate annealing to zero over 30
          epochs, batch size 128, and standard augmentations (random rotations
          and flips, which galaxies are naturally invariant to). Class imbalance
          was handled by sampling with inverse-frequency weights at training
          time. All seeds were fixed so that the two regimes in Project 1 could
          be compared directly.
        </p>
      </section>

      {/* ─── Project 1 ────────────────────────────────────────────────── */}
      <section id="soft-labels" className="scroll-mt-24">
        <h2 className={sectionH2()}>
          Project 1 — Training with human disagreement
        </h2>
        <p className={`${proseP} italic`}>
          Does training a CNN against full vote distributions, rather than
          majority-vote labels, produce better-calibrated morphology
          classifiers?
        </p>

        <h3 className={sectionH3()}>The question</h3>
        <p className={proseP}>
          Galaxies at billions of light-years are blurry, faint, and partly
          obscured. Two human annotators looking at the same image can
          reasonably disagree about whether a feature is a spiral arm or just
          noise. The convention in this field is to take the majority vote and
          train the model on that as a one-hot label — implicitly throwing away
          the disagreement.
        </p>
        <p className={proseP}>
          But that disagreement is information. If 49% of annotators thought a
          galaxy was a face-on spiral and 49% thought it was a face-on
          non-spiral, telling the model &ldquo;the answer is spiral&rdquo; is a
          lie of sorts. What if we trained the model on <em>both</em> — feeding
          it the full distribution of human votes and asking it to match that
          distribution?
        </p>

        {/* ─── Interactive widget 3: Soft label intuition ───────────── */}
        <SoftLabelWidget />

        <h3 className={sectionH3()}>The setup</h3>
        <p className={proseP}>
          I trained two identical CNNs with identical data, identical
          hyperparameters, identical seeds — differing only in the loss
          function. The first (&ldquo;CE&rdquo;) used standard cross-entropy
          against majority-vote labels. The second (&ldquo;KL&rdquo;) used a
          soft-target cross-entropy equivalent to minimizing KL divergence from
          the vote-fraction distribution. Both ran for 30 epochs on the same
          35,000-image training set.
        </p>

        <h3 className={sectionH3()}>The headline result</h3>
        <p className={proseP}>
          Soft-label training improved overall accuracy by 3.4 percentage points
          (80.4% → 83.8%). It also produced output distributions that tracked
          human vote fractions about 40% more closely on average. That&apos;s
          the headline, and it&apos;s the kind of result you can fit in an
          abstract.
        </p>
        <p className={proseP}>
          The more interesting part is what happened underneath that 3.4%.
        </p>

        <PerClassDeltaChart />

        <p className={proseP}>
          The aggregate gain is the net of a large class-specific shift, not a
          uniform improvement. The soft-label model became substantially better
          at ellipticals (+9.7 points) but substantially worse at face-on
          non-spirals (-9.3 points). The other two classes barely moved. Looking
          at the confusion matrices makes the pattern clearer — the shift is
          concentrated almost entirely at the boundary between ellipticals and
          face-on non-spirals, two classes that humans themselves frequently
          confuse.
        </p>

        <figure className="mx-auto my-8 max-w-5xl px-4">
          <Image
            src="/research/confusion-matrices-softhard.jpg"
            alt="Confusion matrices for CE (left) and KL (right) models, showing the shift in misclassification at the elliptical / face-on non-spiral boundary"
            width={2000}
            height={900}
            className="h-auto w-full rounded"
          />
          <figcaption className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
            Confusion matrices for the hard-label (CE) and soft-label (KL)
            models. Rows are true classes, columns are predictions. The largest
            off-diagonal entries — and the biggest changes between the two
            models — are at the elliptical / face-on non-spiral boundary.
          </figcaption>
        </figure>

        <h3 className={sectionH3()}>
          The interesting paradox: better accuracy, worse calibration
        </h3>
        <p className={proseP}>
          Modern neural networks are famous for being overconfident — they tend
          to predict their answers with higher probability than they deserve.
          One hope for soft-label training was that exposure to human-style
          uncertainty during training would fix this. It did the opposite.
        </p>
        <p className={proseP}>
          The CE model is, surprisingly, well-calibrated: its confidence tracks
          its accuracy almost perfectly. The KL model is{" "}
          <em>systematically underconfident</em> — when it says it&apos;s 80%
          sure, it&apos;s actually right about 93% of the time. Across most
          confidence bins, its accuracy exceeds its reported confidence by 8-18
          points.
        </p>

        <figure className="mx-auto my-8 max-w-4xl px-4">
          <Image
            src="/research/reliability-softhard.jpg"
            alt="Reliability diagrams for the CE and KL models. CE tracks the diagonal of perfect calibration. KL's bars sit consistently above the diagonal, indicating that its predictions are systematically less confident than its actual accuracy warrants."
            width={1800}
            height={800}
            className="h-auto w-full rounded"
          />
          <figcaption className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
            Reliability diagrams. The dashed diagonal is perfect calibration.
            CE&apos;s bars hug the diagonal; KL&apos;s sit consistently above
            it, meaning the model under-reports how often it&apos;s right.
          </figcaption>
        </figure>

        <p className={proseP}>
          The plausible mechanism: soft targets teach the model to distribute
          probability mass across morphologically-similar classes, even when one
          class is overwhelmingly correct. The model learns to say &ldquo;mostly
          elliptical, but a little bit non-spiral&rdquo; instead of
          &ldquo;definitely elliptical.&rdquo; That&apos;s closer to what the
          human votes look like — but it produces calibration gaps when measured
          by the standard metrics, which only look at the highest-confidence
          class.
        </p>

        <h3 className={sectionH3()}>Caveats worth taking seriously</h3>
        <p className={proseP}>
          The branch-product structure of the soft targets isn&apos;t symmetric:
          an elliptical target is a single vote fraction, while a face-on
          non-spiral target is the product of three. A model trained on these
          targets may learn concentrated elliptical predictions and spread
          non-spiral predictions for purely arithmetic reasons — independent of
          any morphological similarity story. Disentangling these explanations
          would require comparing against a smoother soft target like label
          smoothing. I also used a single random seed, so some of the finer
          per-class patterns may not replicate. The 3.4% accuracy gain and the
          directional shift at the elliptical / face-on non-spiral boundary are
          robust to these confounds. The calibration interpretation is more
          tentative.
        </p>
      </section>

      {/* ─── Project 2 ────────────────────────────────────────────────── */}
      <section id="domain-shift" className="scroll-mt-24">
        <h2 className={sectionH2()}>
          Project 2 — Domain shift across redshift
        </h2>
        <p className={`${proseP} italic`}>
          How do classifiers trained on nearby galaxies degrade when applied to
          galaxies further away?
        </p>

        <h3 className={sectionH3()}>The question</h3>
        <p className={proseP}>
          Most automated galaxy classifiers are trained on confidently-labeled
          galaxies at low redshift — meaning nearby galaxies, where the images
          are sharp and the morphology is clear. They&apos;re then applied
          across surveys that span a much wider range of distances. At higher
          redshift, galaxies appear smaller, fainter, and blurrier; features
          that cleanly distinguish a spiral arm at z ≈ 0.05 may be invisible at
          z ≈ 0.15.
        </p>
        <p className={proseP}>
          This is a textbook example of <em>domain shift</em>: the inputs change
          in a systematic, measurable way after deployment, even though the
          labels mean the same thing. The question I wanted to answer: how much
          does this matter in practice, and does a more expressive model help?
        </p>

        {/* ─── Redshift-effect placeholder (real images coming) ─────── */}
        <RedshiftComparison />

        <h3 className={sectionH3()}>The setup</h3>
        <p className={proseP}>
          I trained three classifiers of increasing capacity on galaxies at z
          &lt; 0.102 (the 70th percentile of the labeled population) and
          evaluated them on the rest. The three models were: a linear SVM on 207
          hand-crafted morphology features (concentration, asymmetry, Gini,
          etc.), a gradient-boosted tree ensemble on the same features, and the
          same compact CNN from Project 1 trained end-to-end on the raw images.
          All hyperparameters were tuned on the training-domain validation set,
          with no peeking at the out-of-domain data.
        </p>

        <h3 className={sectionH3()}>The headline result</h3>
        <p className={proseP}>
          The CNN is best in-domain, best out-of-domain, and has the smallest
          drop. By macro-F1, the SVM falls from 0.598 to 0.452, the GBDT from
          0.633 to 0.515, and the CNN from 0.772 to 0.665. That broadly matches
          the intuition that more capacity helps under domain shift — but the
          intuition gets some interesting friction once you look at the details.
        </p>

        <figure className="mx-auto my-8 max-w-4xl px-4">
          <Image
            src="/research/f1-vs-redshift.jpg"
            alt="Macro-F1 vs. redshift bin for all three models. Solid lines show in-domain bins, dashed lines show out-of-domain bins."
            width={1800}
            height={1000}
            className="h-auto w-full rounded"
          />
          <figcaption className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
            Macro-F1 against median redshift in each bin. The vertical line
            marks the train/test boundary at z = 0.102. The CNN holds its lead,
            but all three models trend down at similar rates.
          </figcaption>
        </figure>

        <h3 className={sectionH3()}>Capacity doesn&apos;t map to robustness</h3>
        <p className={proseP}>
          The GBDT — which is more expressive than the SVM by every reasonable
          measure — degrades faster. Its per-unit-redshift slope is -3.49,
          compared to -2.37 for the SVM and -2.51 for the CNN. At the very
          highest redshifts the SVM actually overtakes the GBDT. My
          interpretation: tree ensembles split feature space along axis-aligned
          thresholds, and when feature distributions drift smoothly under domain
          change (PSF blur shifts the concentration distribution, etc.), the
          trained thresholds end up in distribution regions the model never saw
          during training. The SVM&apos;s single hyperplane and the CNN&apos;s
          distributed representations both degrade more gracefully.
        </p>

        <h3 className={sectionH3()}>The shared failure mode</h3>
        <p className={proseP}>
          All three models collapse on elliptical galaxies at high redshift,
          along near-parallel lines. The CNN&apos;s elliptical accuracy drops
          from 90% in-domain to 51% on the held-out tail. The mass mostly ends
          up in the face-on non-spiral column — which, looked at from the other
          side, makes face-on non-spiral predictions <em>more frequent</em>, not
          because the model got better at non-spirals but because non-spiral
          became a dumping ground for objects whose features had blurred away.
        </p>

        <figure className="mx-auto my-8 max-w-5xl px-4">
          <Image
            src="/research/per-class-acc-vs-redshift.jpg"
            alt="Per-class accuracy vs. redshift for all three models, broken down by class. Ellipticals show a sharp collapse at high redshift across all three models. Face-on non-spirals show a counterintuitive rise that turns out to be an over-prediction artifact."
            width={2000}
            height={1300}
            className="h-auto w-full rounded"
          />
          <figcaption className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
            Per-class accuracy vs. redshift. The elliptical panel shows the
            shared collapse; the face-on non-spiral panel shows the
            corresponding rise, which is the same phenomenon viewed from the
            other side.
          </figcaption>
        </figure>

        <p className={proseP}>
          I don&apos;t think this elliptical collapse reflects a modeling
          weakness — it&apos;s shared across three very different models with
          very different inductive biases. It reflects a physical limit. At high
          redshift, the distinguishing surface-brightness features of
          ellipticals literally become invisible. A faint, smeared spiral and a
          faint, smeared elliptical can produce visually indistinguishable
          images, and no amount of learned representation compensates for
          information that&apos;s genuinely absent from the input.
        </p>

        <h3 className={sectionH3()}>
          Where the CNN&apos;s edge actually comes from
        </h3>
        <p className={proseP}>
          There&apos;s a useful methodological check buried in the data:
          there&apos;s one redshift bin where both the training-domain galaxies
          and the held-out galaxies appear in roughly equal numbers, at
          essentially identical redshift (around z ≈ 0.089). Comparing
          performance within that single bin isolates the domain effect from the
          redshift effect — any gap there can&apos;t be blamed on the images
          themselves being harder.
        </p>
        <p className={proseP}>
          At identical redshift, the CNN loses 3.2 macro-F1 points crossing the
          domain boundary; the SVM loses 7.5. That&apos;s a real,
          model-attributable robustness advantage, not just better starting
          accuracy. It&apos;s also a useful reminder that aggregate IID → OOD
          numbers can confound &ldquo;the new domain is genuinely harder&rdquo;
          with &ldquo;the new domain is just different.&rdquo;
        </p>

        <figure className="mx-auto my-8 grid max-w-5xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
          <div>
            <Image
              src="/research/iid-confusion.jpg"
              alt="CNN confusion matrix on the in-distribution test set"
              width={1200}
              height={1000}
              className="h-auto w-full rounded"
            />
            <p className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
              CNN, in-domain test set
            </p>
          </div>
          <div>
            <Image
              src="/research/ood-confusion.jpg"
              alt="CNN confusion matrix on the out-of-distribution test set, showing roughly half of all ellipticals being misclassified as face-on non-spirals"
              width={1200}
              height={1000}
              className="h-auto w-full rounded"
            />
            <p className="text-standard-700 dark:text-standard-300 mt-2 text-center text-xs italic">
              CNN, out-of-domain test set
            </p>
          </div>
        </figure>

        <p className={proseP}>
          The two confusion matrices side-by-side show the failure mode clearly:
          in-domain, ellipticals are classified correctly 90% of the time;
          out-of-domain, that drops to 51%, with nearly half being absorbed into
          the face-on non-spiral column.
        </p>

        <h3 className={sectionH3()}>The takeaway</h3>
        <p className={proseP}>
          More model capacity helps, but not as much as you&apos;d expect, and
          not where you&apos;d expect. The CNN holds the top spot at every
          redshift, but a large component of the degradation everyone shows
          isn&apos;t a modeling failure — it&apos;s information that isn&apos;t
          in the image anymore. For astronomical pipelines applied across
          surveys, the practical implication is that robust evaluation needs
          per-class metrics stratified by redshift and a precision-recall
          decomposition, not just aggregate accuracy.
        </p>
      </section>

      {/* ─── Resources ────────────────────────────────────────────────── */}
      <section id="resources" className="scroll-mt-24">
        <h2 className={sectionH2()}>Resources</h2>
        <p className={proseP}>
          Both papers are available as PDFs below. The code for both projects —
          data processing, model definitions, training scripts, and evaluation —
          lives in a single repo:{" "}
          <a
            href="https://github.com/theonlynanu/GalaxyZooClassification"
            target="_blank"
            rel="noopener noreferrer"
            className="text-standard-700 dark:text-standard-300 hover:underline"
          >
            github.com/theonlynanu/GalaxyZooClassification
          </a>
          .
        </p>

        <div className="mx-8 mt-8 flex flex-wrap gap-4 md:mx-12">
          <a
            className={`bg-standard-100 dark:bg-standard-900 hover:border-standard-900 hover:bg-standard-300 rounded-2xl border px-4 py-2 text-base`}
            download
            href="/files/SoftLabels.pdf"
          >
            Download Project 1 paper (PDF)
          </a>
          <a
            className={`bg-standard-100 dark:bg-standard-900 hover:border-standard-900 hover:bg-standard-300 rounded-2xl border px-4 py-2 text-base`}
            download
            href="/files/DomainShift.pdf"
          >
            Download Project 2 paper (PDF)
          </a>
        </div>

        <PaperPreview
          src="/files/SoftLabels.pdf"
          label="Preview: Project 1 — Soft vs. hard labels"
        />
        <PaperPreview
          src="/files/DomainShift.pdf"
          label="Preview: Project 2 — Domain shift"
        />

        <p
          className={`${proseP} text-standard-700 dark:text-standard-300 mt-12 text-sm`}
        >
          If you have questions, spot a bug in the analysis, or want to discuss
          any of this, feel free to reach out via the{" "}
          <Link
            href="/contact"
            className="text-standard-900 dark:text-standard-100 hover:underline"
          >
            contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
