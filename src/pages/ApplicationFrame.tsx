import { ReactNode } from "react";

import { BarChart3, ParkingSquare, User, User2 } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useAuth } from "@/provider/AuthProvider.tsx";
import logoSrc from "@/assets/logo.png";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";

export default function ApplicationFrame() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed flex h-16 w-full items-center gap-4 bg-background px-6 drop-shadow-md"
        style={{ zIndex: 9999 }}
      >
        <div className="w-10">
          <AspectRatio ratio={6 / 5} className="-mt-0.5">
            <img src={logoSrc} alt="Image" />
          </AspectRatio>
        </div>
        <div className="flex flex-grow items-center pl-6 text-primary-foreground">
          <NavButton to="/map">Map</NavButton>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{user?.name}</span>
                <User2 className="h-16 rounded-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" style={{ zIndex: 9999 }}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/parking")}>
                  <ParkingSquare className="mr-2 h-4 w-4" />
                  <span>Parking Spots</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-16"></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function NavButton({ to, children }: { to: string; children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const selected = (to === "/" && location.pathname === "/") || (to !== "/" && location.pathname.startsWith(to));

  return (
    <Button variant={selected ? "default" : "link"} onClick={() => navigate(to)}>
      {children}
    </Button>
  );
}
