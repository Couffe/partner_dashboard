import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HandCoins, HomeIcon, LogOutIcon } from "lucide-react";
import SidebarUser from "./SidebarUser";
import { Link, useLocation } from "react-router-dom";

type SidebarNavProps = {
  onLinkClick?: () => void;
};

const SidebarNav = ({ onLinkClick }: SidebarNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="pt-1 px-1">
              <SidebarMenuButton
                asChild
                onClick={onLinkClick}
                isActive={currentPath === "/dashboard"}
              >
                <Link to="/dashboard">
                  <HomeIcon />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="p-1">
              <SidebarMenuButton
                asChild
                onClick={onLinkClick}
                isActive={currentPath === "/payouts"}
              >
                <Link to="/payouts">
                  <HandCoins />
                  <span>Payouts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-full">
                  <SidebarUser />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default SidebarNav;
