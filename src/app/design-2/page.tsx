import type { Metadata } from "next";
import { Meadow } from "./meadow";

export const metadata: Metadata = {
  title: "H2GO — Meadow concept",
  description: "Light paper card on deep green, floating pill nav, bento cards and a stats grid. Based on the Finaro reference.",
};

export default function Page() {
  return <Meadow />;
}
