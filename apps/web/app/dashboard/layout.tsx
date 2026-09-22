import { requireSession } from "@/lib/require-session";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireSession();

  return <div>{children}</div>;
}
