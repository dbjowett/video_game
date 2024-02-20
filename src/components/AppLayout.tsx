import { type ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";
import { NavBar } from "./Navbar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="overflow-hidden">
        <NavBar />
        <div className="min-h-screen bg-background px-3 pb-10">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};
