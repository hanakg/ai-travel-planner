import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_AUTH_URL}/get-session`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}
