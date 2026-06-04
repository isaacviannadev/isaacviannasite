export {};

declare global {
  interface Window {
    /** Reveal sweep bridge — the horizontal-scroll loop calls this each frame. */
    __ivSweep?: () => void;
    /** Current horizontal translate (px) exposed by the scroll engine. */
    __HX?: number;
  }
}
