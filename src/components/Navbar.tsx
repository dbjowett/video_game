import { signIn, signOut, useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export const TabItems = {
  upcoming: { param: "/upcoming", title: "Upcoming" },
  toprated: { param: "/toprated", title: "Top Rated" },
  popular: { param: "/popular", title: "Popular" },
  favourites: { param: "/favourites", title: "Favourites" },
} as const;

export type PageTypes = keyof typeof TabItems;

interface TabBarProps {
  activeTab: PageTypes;
  hasAuth: boolean;
}

export const TabBar: FC<TabBarProps> = ({ activeTab, hasAuth }) => (
  <>
    {Object.entries(TabItems).map(([key, value]) => (
      <NavigationMenuItem key={key}>
        <Link
          legacyBehavior
          passHref
          href={value.param}
          className={`text-md rounded-lg px-2 py-1 ${
            activeTab === key
              ? "bg-gray-900 text-gray-100"
              : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {value.title}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    ))}
    <NavigationMenuItem>
      <Button
        variant="outline"
        onClick={() => (hasAuth ? void signOut() : void signIn())}
      >
        {hasAuth ? "Sign Out" : "Sign In"}
      </Button>
    </NavigationMenuItem>
  </>
);

export const NavBar = () => {
  const session = useSession();
  const hasAuth = session.status === "authenticated";
  const pathname = usePathname();

  const activeTab = Object.entries(TabItems).find(
    ([_, value]) => value.param === pathname
  )?.[0] as PageTypes;

  return (
    <nav className="bg-base-100 flex h-20 items-center justify-between px-10">
      <div>
        <Link
          href="/"
          className="flex items-center gap-1 self-end rounded-lg px-3 py-1.5 text-lg font-semibold uppercase tracking-widest text-gray-900 hover:bg-gray-100 "
        >
          <TbDeviceGamepad2 />
          Video Games
        </Link>
      </div>
      <div className="flex gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <TabBar activeTab={activeTab} hasAuth={hasAuth} />
          </NavigationMenuList>
        </NavigationMenu>
        {hasAuth && (
          <Avatar>
            <AvatarImage src={session.data?.user.image ?? ""} />
            <AvatarFallback>
              {getInitials(session.data?.user.name ?? "")}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </nav>
  );
};
