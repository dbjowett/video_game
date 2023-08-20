import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { TbDeviceGamepad2 } from "react-icons/tb";

export const TabItems = {
  upcoming: { param: "/upcoming", title: "Upcoming" },
  toprated: { param: "/toprated", title: "Top Rated" },
  popular: { param: "/popular", title: "Popular" },
} as const;
export type PageTypes = keyof typeof TabItems;

export const NavBar = () => {
  const session = useSession();
  const hasAuth = session.status === "authenticated";

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href="/"
          className=" normal-casedark-mode:text-white focus:shadow-outline btn btn-ghost flex gap-1 self-end rounded-lg  text-lg font-semibold uppercase tracking-widest text-gray-900 focus:outline-none"
        >
          <TbDeviceGamepad2 />
          Video Games
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
            {session.data?.user ? (
              <div className="w-10 rounded-full">
                <Image
                  alt={session.data.user.name ?? "User Profile Image"}
                  width={50}
                  height={50}
                  src={session.data?.user.image ?? ""}
                />
              </div>
            ) : null}
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li onClick={() => (hasAuth ? void signOut() : void signIn())}>
              <a>{hasAuth ? "Logout" : "Login"}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
