"use client";

import { useEffect, useState } from "react";
import { ROLES_TYPED } from "@/content/portfolio";
import { useLang } from "@/components/LangProvider";

/**
 * Kinetic typed role line: types a role out, holds, deletes, advances to the
 * next, looping. Resets on language change. Ported from site.js typedRole().
 * Renders the `.role` text + blinking `.tcaret` (CSS-animated).
 */
export function TypedRole() {
  const { lang } = useLang();
  const [text, setText] = useState("");

  useEffect(() => {
    const list = ROLES_TYPED[lang];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(list[0]);
      return;
    }

    let ri = 0;
    let ci = 0;
    let del = false;
    let to: number;

    const tick = () => {
      const full = list[ri % list.length];
      if (!del) {
        ci++;
        setText(full.slice(0, ci));
        if (ci >= full.length) {
          del = true;
          to = window.setTimeout(tick, 1600);
          return;
        }
        to = window.setTimeout(tick, 65);
      } else {
        ci--;
        setText(full.slice(0, ci));
        if (ci <= 0) {
          del = false;
          ri++;
          to = window.setTimeout(tick, 260);
          return;
        }
        to = window.setTimeout(tick, 34);
      }
    };

    setText("");
    to = window.setTimeout(tick, 650);
    return () => window.clearTimeout(to);
  }, [lang]);

  return (
    <>
      <span className="role" id="typed-role">
        {text}
      </span>
      <span className="tcaret" />
    </>
  );
}
