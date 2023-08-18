import GameList from "~/components/GameList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <GameList type="upcoming" />
    </main>
  );
}
