import { ReactNode } from "react";

import { BarChart3, User } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
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

export default function ApplicationFrame() {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed flex h-16 w-full items-center gap-4 bg-background px-6 drop-shadow-md"
        style={{ zIndex: 9999 }}
      >
        <div className="w-10">
          {/*<AspectRatio ratio={6 / 5}>*/}
          {/*  <img src={src} alt="Image" />*/}
          {/*</AspectRatio>*/}
          LOGO
        </div>
        <div className="flex flex-grow items-center pl-6 text-primary-foreground">
          <NavButton to="/">Home</NavButton>
          <NavButton to="/map">Map</NavButton>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" style={{ zIndex: 9999 }}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
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
