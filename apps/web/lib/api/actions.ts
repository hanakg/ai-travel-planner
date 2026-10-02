import { CreateTripValues } from "@/schemas/trip";
import { api } from "./client";

export const generateTripApi = (data: CreateTripValues) => {
  return api<CreateTripValues>("/trip/create", { method: "POST", body: data });
};
