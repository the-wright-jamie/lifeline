"use client";

import { useRouter } from "next/navigation";
import MegaHeader from "./mega-header";

export default function Home() {
  function dataExists() {
    const router = useRouter();
    let dependencies = localStorage.getItem("dependencies") || "";

    if (dependencies === "") {
      router.push("oobe");
    } else {
      router.push("dashboard");
    }
  }

  dataExists();

  return;
}
