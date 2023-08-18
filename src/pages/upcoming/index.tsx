import GameList from "~/components/GameList";
import { Layout } from "~/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <GameList type="upcoming" />
      </main>
    </Layout>
  );
}
