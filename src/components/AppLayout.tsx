import { SpeedInsights } from "@vercel/speed-insights/next";
import { type ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";
import { NavBar } from "./Navbar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="overflow-hidden">
        <div className="mb-16">
          <NavBar />
        </div>
        <div className="min-h-screen bg-background px-3 pb-10">{children}</div>
      </main>
      <Toaster />
      <SpeedInsights />
    </div>
  );
};
