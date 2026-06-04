"use client";

import Link from "next/link";
import { useClock } from "@/hooks/useClock";
import { LangToggle } from "./LangToggle";

export function Nav() {
  const clock = useClock();
  return (
    <nav id="nav">
      <Link className="brand" href="/" data-cursor="Top">
        Isaac Vianna<span className="dot">.</span>
      </Link>
      <div className="nav-right">
        <LangToggle />
        <span className="mono clock" id="clock" suppressHydrationWarning>
          {clock || "00:00:00"}
        </span>
      </div>
    </nav>
  );
}
