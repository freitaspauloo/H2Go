import type { Metadata } from "next";
import { Northlight } from "./northlight";

export const metadata: Metadata = {
  title: "H2GO — Northlight concept",
  description: "Full-bleed photographic hero with floating tags, lime-on-dark partnerships band and a light about section. Based on the Upmind reference.",
};

export default function Page() {
  return <Northlight />;
}
