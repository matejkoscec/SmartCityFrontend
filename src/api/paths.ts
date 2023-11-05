import { Id } from "@/api/types.ts";

export const basePath = "/api";

export default {
  parkingSpots: {
    all: "/parking-spot/get-parking-spots",
    delete: (id: Id) => `/parking-spot/delete/${id}`,
  },
  auth: {
    login: "/login",
    register: "/register",
    currentUser: "/current-user",
    refresh: "/refresh",
  }
} as const;
