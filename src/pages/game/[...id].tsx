import { z } from "zod";
import { useFetchGame } from "~/hooks/useFetchGames";
import { useTypedRouter } from "~/hooks/useTypedRouter";

const routerSchema = z.object({
  id: z.array(z.string()).length(2),
});
export default function Page() {
  const {
    query: { id },
  } = useTypedRouter(routerSchema);
  const source = id[0] ?? "";
  const gameId = id[2] ?? "";

  const { data, isLoading, isError } = useFetchGame(gameId, source);

  // if (isLoading) return <Spinner />;
  // if (isError) return <div>Error...</div>;

  return <p>Game:</p>;
}
