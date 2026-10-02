"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const cookieStore = await cookies();

  const { body, headers, ...fetchOptions } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
    ...(body !== undefined
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });

  if (!response.ok) {
    let message = `API error: ${response.status}`;

    try {
      const error = await response.json();
      message = error.message ?? message;
    } catch {
      // Response isn't JSON
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
