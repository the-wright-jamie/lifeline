import { useEffect, useState } from "react";



export default function Home() {
  function dataExists() {
    useEffect(() => {
      let dependencies = localStorage.getItem("dependencies") || "";

      if (dependencies === "") {
        return false;
      } else {
        return true;
      }
    }, []);
  }
  
  let message = "data doesn't exist";

  if (dataExists()) {
    message = "data exists";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-blue-400 after:via-red-300 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent after:dark:via-[#ff0000] after:dark:opacity-50 sm:after:w-[240px]">
        <h1 className="mb-3 text-5xl font-semibold">{this.message}</h1>
      </div>

      <div>
        <svg
          class="animate-spin -ml-1 mr-3 h24 w-24 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </main>
  );
}
