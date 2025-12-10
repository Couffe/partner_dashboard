import { Sidebar } from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav.tsx";

const AppSidebar = () => {
  return (
    <Sidebar className="hidden lg:block">
      <SidebarNav />
    </Sidebar>
  );
};

export default AppSidebar;
