import type { Metadata } from "next";
import { Evergreen } from "./evergreen";

export const metadata: Metadata = {
  title: "H2GO — Evergreen concept",
  description: "Dark forest hero, lime accents, photo strip and stats. Based on the Cleanora reference.",
};

export default function Page() {
  return <Evergreen />;
}
