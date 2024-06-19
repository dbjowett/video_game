import GameList from "~/components/GameList";

export default function Home() {
  // TODO: Get Top Rated Games here

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <GameList type="toprated" />
    </main>
  );
}
