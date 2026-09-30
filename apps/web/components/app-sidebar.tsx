"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, Map, Plus, Settings, UserRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

type AppSidebarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

const navigationItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "My trips", href: "/dashboard/trips", icon: Map },
  { label: "Create trip", href: "/dashboard/trips/new", icon: Plus },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Travel planner logo"
            width={36}
            height={36}
            className="size-9 rounded-xl object-cover"
            priority
          />
          <span className="text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            AI Travel Planner
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-3 p-3">
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard/profile" />}
              tooltip="Profile"
              size="lg"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
                  {initials || <UserRound />}
                </span>
              )}
              <span className="flex min-w-0 flex-col items-start gap-0.5 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="max-w-40 truncate text-xs text-sidebar-foreground/60">
                  {user.email}
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              onClick={handleLogout}
              tooltip="Log out"
              className="text-sidebar-foreground/70 hover:text-destructive"
            >
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
