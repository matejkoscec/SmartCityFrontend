export const basePath = "/api";

export default {
  parkingSpots: {
    all: "/parking-spot/get-parking-spots",
  },
  auth: {
    login: "/login",
    register: "/register",
    currentUser: "/current-user",
    refresh: "/refresh",
  }
} as const;
