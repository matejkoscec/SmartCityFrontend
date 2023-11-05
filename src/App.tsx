import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster.tsx";
import ApplicationFrame from "@/pages/ApplicationFrame.tsx";
import Login from "@/pages/Login/Login.tsx";
import MapPage from "@/pages/Map/MapPage.tsx";
import ParkingList from "@/pages/Parking/ParkingList.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Register from "@/pages/Register/Register.tsx";
import AuthProvider from "@/provider/AuthProvider.tsx";
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
        <AuthProvider>
          <ClientProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<ApplicationFrame />}>
                <Route path="map" element={<MapPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="parking" element={<ParkingList />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<>404 page not found</>} />
            </Routes>
          </ClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
