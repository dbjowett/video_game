import GameList from "~/components/GameList";

export default function Home() {
  // TODO: Get Popular Games here

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <GameList type="popular" />
    </main>
  );
}
