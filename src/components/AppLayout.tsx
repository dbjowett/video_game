import { type ReactNode } from "react";
import { NavBar } from "./Navbar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-slate-100 px-3 pb-10">{children}</div>
    </div>
  );
};
