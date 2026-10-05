import { CreateTripValues } from "@/schemas/trip";
import { api } from "./client";
import type { CreateTripBody } from "@api-types";

export const generateTripApi = (data: CreateTripValues) => {
  return api<CreateTripBody>("/trip/create", { method: "POST", body: data });
};
