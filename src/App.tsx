import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster.tsx";
import ApplicationFrame from "@/pages/ApplicationFrame.tsx";
import ClientProvider from "@/provider/ClientProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchIntervalInBackground: false,
      staleTime: 1000 * 10,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ClientProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<ApplicationFrame />}>
              <Route path="/" element={<>Home</>} />
              <Route path="map" element={<>Map</>} />
              <Route path="profile" element={<>Profile</>} />
            </Route>
          </Routes>
        </ClientProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
