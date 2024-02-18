import { type ReactNode } from "react";
import { NavBar } from "./Navbar";
import { Toaster } from "../components/ui/toaster";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="overflow-hidden">
        <NavBar />
        <div className="min-h-screen bg-slate-100 px-3 pb-10">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};
