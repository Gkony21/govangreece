const fills = { night: "fill-night", "night-2": "fill-night-2" };

export type NeonSeamProps = {
  // The backgrounds of the sections above and below.
  from: keyof typeof fills;
  to: keyof typeof fills;
  // Which way the line climbs from left to right.
  climbs: "up" | "down";
};

// The hero's slanted neon line, between two sections that have no photo cut to part them (.neon-seam in globals.css).
export default function NeonSeam({ from, to, climbs }: NeonSeamProps) {
  const [left, right] = climbs === "up" ? [96, 4] : [4, 96];
  return (
    <div aria-hidden="true" className="neon-seam">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon className={fills[from]} points={`0,-1 100,-1 100,${right} 0,${left}`} />
        <polygon className={fills[to]} points={`0,${left} 100,${right} 100,101 0,101`} />
        <line x1="-2" y1={left} x2="102" y2={right} />
      </svg>
    </div>
  );
}
