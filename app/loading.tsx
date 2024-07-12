import MegaHeader from "./mega-header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MegaHeader />
        <h2 className="mb-3 text-2xl font-semibold">
          Loading...
        </h2>
    </main>
  );
}
