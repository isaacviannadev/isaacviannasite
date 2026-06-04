import type { CSSProperties } from "react";

function SlotIcon() {
  return (
    <svg
      className="icn"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

/** The captioned empty state — usable inside any positioned container. */
export function SlotEmpty({ cap }: { cap: string }) {
  return (
    <div className="slot-empty">
      <SlotIcon />
      <span className="cap">{cap}</span>
    </div>
  );
}

interface ImageSlotProps {
  cap: string;
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Image placeholder. Renders the supplied image when `src` is set, otherwise
 * a captioned empty state. Project screenshots aren't in the bundle yet, so
 * those slots show the placeholder until real assets are dropped in.
 */
export function ImageSlot({ cap, src, alt, className, style }: ImageSlotProps) {
  return (
    <div className={`slot${className ? ` ${className}` : ""}`} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="slot-fill" src={src} alt={alt ?? cap} />
      ) : (
        <SlotEmpty cap={cap} />
      )}
    </div>
  );
}
