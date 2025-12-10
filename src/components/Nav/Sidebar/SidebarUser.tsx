import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/store/authProvider";
import { ChevronUp } from "lucide-react";

const SidebarUser = () => {
  const { user } = useAuth();

  return (
    <>
      <Avatar>
        <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-base">
        <p className="">{user?.name}</p>
      </div>

      <ChevronUp className="ml-auto" />
    </>
  );
};

export default SidebarUser;
