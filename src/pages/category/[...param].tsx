import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GameList from "~/components/GameList";
import type { PageTypes } from "../../components/Navbar.jsx";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const param = router.query.param as string;
    if (!param) return;
    void setQuery(param?.toString());
  }, [router.query, router.isReady]);

  if (!query) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <GameList type={query as PageTypes} />
    </main>
  );
}
