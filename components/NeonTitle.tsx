type Props = {
  title: string;
  // The end of the title, which lights up in the --halo colour set around it.
  neon?: string;
};

// A section's title with its last words lit.
export default function NeonTitle({ title, neon }: Props) {
  if (!neon || !title.endsWith(neon)) return title;
  return (
    <>
      {title.slice(0, -neon.length)}
      <span className="neon-words">{neon}</span>
    </>
  );
}
