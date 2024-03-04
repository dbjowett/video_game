import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { AppLayout } from "~/components/AppLayout";
import { ThemeProvider } from "../components/ThemeProvider";

import { ModalProvider } from "~/components/ModalProvider";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const queryClient = new QueryClient();
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            themes={["light", "dark"]}
          >
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ModalProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
