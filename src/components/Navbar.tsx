import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { Button } from "../components/ui/button";

export const TabItems = {
  upcoming: { param: "/upcoming", title: "Upcoming" },
  toprated: { param: "/toprated", title: "Top Rated" },
  popular: { param: "/popular", title: "Popular" },
};

const MenuButton = ({
  toggleOpen,
  open,
}: {
  toggleOpen: () => void;
  open: boolean;
}) => {
  return (
    <button
      className="focus:shadow-outline rounded-lg focus:outline-none md:hidden"
      onClick={toggleOpen}
    >
      <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
        <path
          style={{ display: !open ? "block" : "none" }}
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
        <path
          style={{ display: open ? "block" : "none" }}
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export const NavBar = () => {
  const session = useSession();
  const hasAuth = session.status === "authenticated";
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  type TabItemType = { param: string; title: string };

  const ListItem = ({ item: { param, title } }: { item: TabItemType }) => {
    return (
      <li className="self-center">
        <Link
          className={`rounded-md  px-4 py-2 hover:bg-slate-200 ${
            pathname === param ? "bg-slate-200" : ""
          }`}
          href={param}
        >
          {title}
        </Link>
      </li>
    );
  };

  console.log(session);

  return (
    <nav className="dark-mode:bg-gray-900 mb-3 bg-slate-100 py-2 antialiased">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <Link
            href="/"
            className="dark-mode:text-white focus:shadow-outline flex gap-1 self-end rounded-lg  text-lg font-semibold uppercase tracking-widest text-gray-900 focus:outline-none"
          >
            <TbDeviceGamepad2 />
            Video Games
          </Link>

          <MenuButton toggleOpen={() => setOpen((prev) => !prev)} open={open} />
        </div>
        <nav
          className={`flex-grow flex-col ${
            open ? "flex" : "hidden"
          } pb-4 md:flex md:flex-row md:justify-end md:pb-0`}
        >
          <ul className="flex justify-end gap-4 align-middle">
            {Object.keys(TabItems).map((item) => (
              <ListItem
                key={item}
                item={TabItems[item as keyof typeof TabItems]}
              />
            ))}
            <li className="self-center">
              <Button
                onClick={() => (!hasAuth ? void signIn() : void signOut())}
              >
                {!hasAuth ? "Sign In" : "Sign Out"}
              </Button>
            </li>
            <li>
              {session.data?.user ? (
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <Image
                      alt={session.data.user.name ?? "User Profile Image"}
                      width={50}
                      height={50}
                      src={session.data?.user.image ?? ""}
                    />
                  </div>
                </div>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};
