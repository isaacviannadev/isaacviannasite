import { Home } from "@/components/Home";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return <Home />;
}
