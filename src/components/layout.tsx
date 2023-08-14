import { NavBar } from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 pb-10">
      <NavBar />
      {children}
    </div>
  );
}
