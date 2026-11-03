export type NeonSignKind = "logo" | "cocktail" | "heart";

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
};

// A neon sign hanging on two wires on the dark side of a breath, on computers only. White-hot tubes with a halo in
// the breath's --halo colour; it flickers on once as it comes into view (CSS in globals.css). Decorative only.
export default function NeonSign({ kind }: { kind: NeonSignKind }) {
  return (
    <div aria-hidden="true" className="neon-sign hidden lg:block">
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
