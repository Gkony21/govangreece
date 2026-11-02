type Props = {
  items: string[];
};

// Service names scrolling past in a loop. The list is repeated four times: enough to fill wide screens,
// and the track moves by exactly half of it (app/globals.css), so the loop has no seam.
// Decorative: the same names are in the services section, so screen readers skip it.
export default function ServiceBand({ items }: Props) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="service-band overflow-hidden border-b border-line bg-night-2 py-4" aria-hidden="true">
      <div className="service-band-track flex w-max font-display text-[clamp(1.8rem,5vw,3rem)] font-extrabold whitespace-nowrap text-violet">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center pr-10">
            {item}
            <span className="ml-10 text-[0.6em] text-amber">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
