import { createContext, ReactNode, useContext, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import HttpClient from "@/api/HttpClient.ts";
import { basePath } from "@/api/paths.ts";
import { useToast } from "@/components/ui/use-toast.ts";

export default function ClientProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const value = useMemo(
    () => ({
      client: new HttpClient(basePath, true, (errorResponse) => {
        if (
          (errorResponse.status === 401 || errorResponse.status === 403) &&
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          navigate("/login", { state: { previousLocation: location.pathname }});
          toast({
            title: "Authentication error",
            description: "Session expired",
            variant: "destructive",
          });
          return;
        }

        if (errorResponse.validationErrors) {
          toast({
            title: errorResponse.message ?? errorResponse.error,
            description: (
              <div className="flex flex-col">
                {Object.keys(errorResponse.validationErrors).map((key) => (
                  <div key={key} className="flex gap-2">
                    <span className="font-semibold">{key}:</span>
                    <span>{errorResponse.validationErrors?.[key].join(", ")}</span>
                  </div>
                ))}
              </div>
            ),
            variant: "destructive",
          });
          return;
        }

        toast({
          title: errorResponse.error,
          description: errorResponse.message,
          variant: "destructive",
        });
      }),
    }),
    [location.pathname, navigate, toast],
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
