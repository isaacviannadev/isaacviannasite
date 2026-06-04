"use client";

import { useEffect, useState } from "react";

/**
 * Live Lisbon clock (Isaac is based in Portugal). Starts empty so SSR and the
 * first client render match, then ticks every second.
 */
export function useClock(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const tz = get("timeZoneName") || "WET";
      setTime(`${get("hour")}:${get("minute")}:${get("second")} ${tz}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
