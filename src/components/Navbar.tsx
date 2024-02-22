import { getInitials } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./ui/button";

import { GameController, List, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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

const TabBar: FC<TabBarProps> = ({ activeTab, hasAuth }) => (
  <>
    {Object.entries(TabItems).map(([key, value]) => (
      <NavigationMenuItem key={key}>
        <Link
          key={key}
          legacyBehavior
          passHref
          href={value.param}
          className={`text-md mx-2 my-4 w-full rounded-lg px-2 py-1  ${
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

interface MobileTabBarProps {
  hasAuth: boolean;
}

const MobileTabBar: FC<MobileTabBarProps> = ({ hasAuth }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>
      <List size={22} />
    </NavigationMenuTrigger>

    <NavigationMenuContent>
      {Object.entries(TabItems).map(([key, value]) => (
        <Link key={key} legacyBehavior passHref href={value.param}>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {value.title}
          </NavigationMenuLink>
        </Link>
      ))}

      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        <div
          className="cursor-pointer"
          onClick={() => (hasAuth ? void signOut() : void signIn())}
        >
          {hasAuth ? "Sign Out" : "Sign In"}
        </div>
      </NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export const NavBar = () => {
  const session = useSession();
  const { setTheme, theme } = useTheme();

  const hasAuth = session.status === "authenticated";
  const pathname = usePathname();

  const activeTab = Object.entries(TabItems).find(
    ([_, value]) => value.param === pathname
  )?.[0] as PageTypes;

  const Icon = () =>
    theme === "dark" ? <Sun size={20} /> : <Moon size={20} />;

  return (
    <nav className="bg-base-100 flex h-20 items-center justify-between px-2">
      <div>
        <Link
          href="/"
          className="flex items-center gap-1 self-end rounded-lg px-3 py-1.5 text-lg font-semibold uppercase tracking-widest"
        >
          <GameController size={24} weight="fill" />
          Video Games
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="hidden gap-2 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <TabBar activeTab={activeTab} hasAuth={hasAuth} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          <Icon />
        </Button>

        <div className="gap-2 lg:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <MobileTabBar hasAuth={hasAuth} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {hasAuth && (
          <Avatar>
            <AvatarImage src={session.data?.user.image ?? ""} />

            <AvatarFallback>
              {getInitials(session.data?.user.name ?? "")}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex gap-2 lg:hidden">{/* mobile */}</div>
      </div>
    </nav>
  );
};
