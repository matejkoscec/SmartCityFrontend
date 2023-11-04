import { ReactNode } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export default function ApplicationFrame() {
  return (
    <div className="min-h-screen bg-primary">
      <div className="fixed flex h-16 w-full items-center gap-4 bg-primary px-6" style={{ zIndex: 9999 }}>
        <div className="w-10">
          {/*<AspectRatio ratio={6 / 5}>*/}
          {/*  <img src={src} alt="Image" />*/}
          {/*</AspectRatio>*/}
        </div>
        <div className="flex flex-grow items-center pl-6 text-primary-foreground">
          <NavButton to="/">Home</NavButton>
        </div>
      </div>
      <div className="h-16"></div>
      <div className="pb-8">
        <Outlet />
      </div>
    </div>
  );
}

function NavButton({ to, children }: { to: string; children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      className={`${location.pathname.startsWith(to) ? "bg-accent text-primary" : ""}`}
      variant={"outline"}
      onClick={() => navigate(to)}
    >
      {children}
    </Button>
  );
}
