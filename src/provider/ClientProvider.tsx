import { createContext, ReactNode, useContext, useMemo } from "react";

import HttpClient from "@/api/HttpClient.ts";
import { basePath } from "@/api/paths.ts";
import { useAuth } from "@/provider/AuthProvider.tsx";

export default function ClientProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  const value = useMemo(
    () => ({
      client: new HttpClient(basePath, true, token as string),
    }),
    [token]
  );

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

const ClientContext = createContext<{ client: HttpClient } | null>(null);

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
}
