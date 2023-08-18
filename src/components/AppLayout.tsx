import { type ReactNode } from "react";
import { NavBar } from "./Navbar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-slate-100 pb-10">
      <NavBar />
      {children}
    </div>
  );
};