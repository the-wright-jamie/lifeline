export default function MegaHeader() {
  return (
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-blue-400 after:via-red-300 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent after:dark:via-[#ff0000] after:dark:opacity-50 sm:after:w-[240px]">
        <h1 className="mb-3 text-5xl font-semibold">Lifeline</h1>
      </div>
  );
}
