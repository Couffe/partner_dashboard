import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarNav from "./SidebarNav";
import { useState } from "react";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col pt-10 bg-sidebar">
        <SidebarNav onLinkClick={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
