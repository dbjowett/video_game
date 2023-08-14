import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const NavBar = () => {
    return (
      <nav className="flex justify-between px-8 py-4">
        <Link href="/">Video Games</Link>
        <ul className="flex gap-4">
          <li>
            <Link
              className="rounded-md px-2 py-1 hover:bg-slate-200"
              href="/upcoming"
            >
              Upcoming
            </Link>
          </li>
          <li>
            <Link
              className="rounded-md px-2 py-1 hover:bg-slate-200"
              href="/toprated"
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              className="rounded-md px-2 py-1 hover:bg-slate-200"
              href="/popular"
            >
              Popular
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
