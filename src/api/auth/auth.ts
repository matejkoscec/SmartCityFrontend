import { useMutation } from "@tanstack/react-query";

import paths from "@/api/paths.ts";
import { useClient } from "@/provider/ClientProvider.tsx";

export function useLogin(onSuccess?: (data: { token: string }) => Promise<void> | void, onError?: () => void) {
  const { client } = useClient();

  return useMutation({
    mutationFn: (loginRequest: unknown) => client.post<{ token: string }>(paths.auth.login, loginRequest),
    onSuccess,
    onError,
  });
}

export function useRegister(onSuccess?: (data: { token: string }) => Promise<void>, onError?: () => void) {
  const { client } = useClient();

  return useMutation({
    mutationFn: (registerRequest: unknown) => client.post<{ token: string }>(paths.auth.register, registerRequest),
    onSuccess,
    onError,
  });
}
