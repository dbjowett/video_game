import { type ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";
import { NavBar } from "./Navbar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Modal } from "./Modal";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="mb-16">
        <NavBar />
      </div>
      <main className="overflow-hidden">
        <div className="min-h-screen bg-background pb-10">{children}</div>
      </main>
      <Toaster />
      <Modal />
    </div>
  );
};
