import ThemeToggle from "../ThemeToggle";
import MobileSidebar from "./Sidebar/MobileSidebar";

const Navbar = () => {
  return (
    <nav className="flex justify-between lg:justify-end flex-row w-full px-2 pt-2">
      <ThemeToggle />
      <MobileSidebar />
    </nav>
  );
};

export default Navbar;
