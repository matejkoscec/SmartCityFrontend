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
  },
  reservations: {
    all: "/reservation/get-reservations",
    create: "/reservation/create",
    delete: "/reservation/delete",
  }
} as const;
