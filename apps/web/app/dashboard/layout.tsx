import { requireSession } from "@/lib/require-session";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <main className="flex min-h-screen w-full flex-1">{children}</main>
    </SidebarProvider>
  );
}
