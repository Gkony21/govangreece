export type NeonSignKind = "logo" | "cocktail" | "heart" | "rating" | "question" | "phone";

// The tubes of the drawn signs, one path each.
const tubes: Record<Exclude<NeonSignKind, "logo">, { viewBox: string; paths: string[] }> = {
  // A cocktail glass with a lime wheel on the rim.
  cocktail: {
    viewBox: "8 6 200 206",
    paths: [
      "M24 40 H164 L94 120 Z",
      "M52 62 H136",
      "M94 120 V188",
      "M58 198 Q94 184 130 198",
      "M186 40 A24 24 0 1 1 138 40 A24 24 0 1 1 186 40",
      "M162 24 V56 M148.1 32 L175.9 48 M148.1 48 L175.9 32",
    ],
  },
  // A heart with a small sparkle.
  heart: {
    viewBox: "10 2 196 184",
    paths: [
      "M100 172 C54 140 22 110 22 76 C22 50 42 30 66 30 C82 30 94 40 100 54 C106 40 118 30 134 30 C158 30 178 50 178 76 C178 110 146 140 100 172 Z",
      "M184 10 V34 M172 22 H196",
      "M196 50 V58 M192 54 H200",
    ],
  },
  // "5" and a star, over the Google reviews. Drawn, not text: if the rating ever drops below 5, redraw or swap it.
  rating: {
    viewBox: "8 12 240 150",
    paths: [
      "M78 40 H34 L28 88 C40 80 52 78 60 80 C76 84 84 98 84 112 C84 132 68 148 50 148 C38 148 28 142 22 134",
      "M164 34 L178.1 72.6 L219.2 74.1 L186.8 99.4 L198.1 138.9 L164 116 L129.9 138.9 L141.2 99.4 L108.8 74.1 L149.9 72.6 Z",
      "M228 22 V38 M220 30 H236",
    ],
  },
  // A speech bubble with a question mark, over the questions.
  question: {
    viewBox: "10 10 196 166",
    paths: [
      "M48 20 H168 A28 28 0 0 1 196 48 V108 A28 28 0 0 1 168 136 H96 L60 168 L66 136 H48 A28 28 0 0 1 20 108 V48 A28 28 0 0 1 48 20 Z",
      "M88 60 C88 42 128 40 128 60 C128 76 108 78 108 94 V100",
      "M108 114 V118",
    ],
  },
  // An old rotary phone, the receiver on top and the finger holes round the dial, with a sparkle, over the form.
  phone: {
    viewBox: "14 10 196 162",
    paths: [
      "M56 52 C80 38 120 38 144 52 C156 46 174 50 176 62 C178 72 170 78 160 76 L138 66 C114 54 86 54 62 66 L40 76 C30 78 22 72 24 62 C26 50 44 46 56 52 Z",
      "M44 164 L64 96 C66 89 72 86 80 86 H120 C128 86 134 89 136 96 L156 164 Z",
      "M124 130 A24 24 0 1 1 76 130 A24 24 0 1 1 124 130",
      "M104 130 A4 4 0 1 1 96 130 A4 4 0 1 1 104 130",
      "M107.5 117 v0.5 M98.2 115.1 v0.5 M89.6 119.2 v0.5 M85.2 127.7 v0.5 M86.8 137 v0.5 M93.7 143.6 v0.5 M103.1 144.7 v0.5 M111.3 139.8 v0.5",
      "M190 18 V42 M178 30 H202",
      "M200 58 V66 M196 62 H204",
    ],
  },
};

// A neon sign hanging on two wires over a breath's line or a section's title: big on computers, small on phones
// (beside the title, in sections). White-hot tubes with a halo in the --halo colour set around it; it flickers on once
// as it comes into view (CSS in globals.css). Decorative only.
export default function NeonSign({ kind }: { kind: NeonSignKind }) {
  return (
    <div aria-hidden="true" className="neon-sign">
      <span className="neon-sign-glow" />
      {kind === "logo" ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized
        <img src="/logo.webp" alt="" width={640} height={640} loading="lazy" decoding="async" />
      ) : (
        <svg viewBox={tubes[kind].viewBox} fill="none" stroke="#fff4fd" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          {tubes[kind].paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      )}
    </div>
  );
}
