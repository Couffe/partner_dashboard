import { useAuth } from "@/store/authProvider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PARTNER_CODE } from "@/TestData/TestData";
import { Copy } from "lucide-react";

interface PartnerCodeProps {
  className?: string;
}

const PartnerCode = ({ className }: PartnerCodeProps) => {
  const [partnerCode, setPartnerCode] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    // API call to get the partner code
    setPartnerCode(PARTNER_CODE.code);
  }, [user]);

  const handlePartnerCodeCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(PARTNER_CODE.code); // update with partner code
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Code failed to copy");
    }
  };

  const hasPromoRate =
    user?.promoRate &&
    user?.promoExpiration &&
    new Date() < new Date(user.promoExpiration);

  return (
    <Card className={`${className} flex flex-col gap-0`}>
      <CardHeader className="text-muted-foreground gap-0">
        Partner Code
      </CardHeader>
      <CardContent className="flex flex-row items-center align-middle gap-2">
        <h3 className="font-bold text-2xl">{partnerCode}</h3>
        <Copy
          className="text-muted-foreground cursor-pointer hover:text-foreground"
          size={16}
          onClick={handlePartnerCodeCopyClick}
        />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        Share this with players to get{" "}
        {hasPromoRate ? user.promoRate : user?.rate}% back!
      </CardFooter>
    </Card>
  );
};

export default PartnerCode;
