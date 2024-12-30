import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GameList from "~/components/GameList";

import { z } from "zod";

const paramValidator = z.enum(["upcoming", "popular", "newReleases"]);
type PageTypes = z.infer<typeof paramValidator>;

export default function Home() {
  const [query, setQuery] = useState<PageTypes | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const param = router.query.param?.toString();
    if (paramValidator.safeParse(param).success) {
      setQuery(param?.toString() as PageTypes);
    } else {
      void router.push("/");
    }
  }, [router.query, router.isReady, router]);

  if (!query) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <GameList type={query} />
    </main>
  );
}
