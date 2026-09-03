import type { Metadata } from "next";
import { Signal } from "./signal";

export const metadata: Metadata = {
  title: "H2GO — Signal concept",
  description: "Orange frame, black canvas, full-bleed portrait hero, big quote and founder story. Based on the Rachel reference.",
};

export default function Page() {
  return <Signal />;
}
