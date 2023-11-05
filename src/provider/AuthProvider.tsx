import React, { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import paths, { basePath } from "../api/paths";

import { useToast } from "@/components/ui/use-toast.ts";

type UserResponse = {
  id: number;
  preferredUsername: string;
  name: string;
  roles: { name: string; }[];
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast, dismiss } = useToast();

  const [token, setToken] = React.useState<string | null>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: () =>
      fetch(`${basePath}${paths.auth.refresh}`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => res as { token: string }),
    onSuccess: (data) => {
      dismiss();
      setToken(data.token);
    },
    onError: () => {
      dismiss();
      navigate("/login");
      setToken(null);
    },
  });
  const { data: user, isError } = useQuery({
    queryKey: ["currentUser", token],
    queryFn: () =>
      fetch(`${basePath}${paths.auth.currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => res as { user: UserResponse }),
    enabled: !isPending || token === undefined,
    staleTime: 1000 * 5,
  });

  useEffect(() => {
    if (isError) {
      // navigate("/login");
      setToken(null);
    }
  }, [isError, navigate]);

  return (
    <AuthContext.Provider value={{ user: user?.user, token, setToken }}>
      {isPending ? <>Loading...</> : children}
    </AuthContext.Provider>
  );
}

const AuthContext = React.createContext<{
  user?: UserResponse;
  token?: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
});

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
