import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/store/authProvider";
import { Meteors } from "../../ui/meteors";
import { BorderBeam } from "../../ui/border-beam";

interface PartnerRateProps {
  className?: string;
}

const PartnerRate = ({ className }: PartnerRateProps) => {
  const { user } = useAuth();

  const hasPromoRate =
    user?.promoRate &&
    user?.promoExpiration &&
    new Date() < new Date(user.promoExpiration);

  return (
    <Card
      className={`${className} relative overflow-hidden flex flex-col gap-0`}
    >
      <CardHeader className="text-muted-foreground gap-0">
        {hasPromoRate ? "Promotion Rate" : "Partner Rate"}
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-2xl">
          {hasPromoRate ? user.promoRate : user?.rate}%
        </h3>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-col items-start">
        {hasPromoRate && (
          <p className="text-orange-400">
            Promotion Expiration: {user?.promoExpiration?.toLocaleDateString()}
          </p>
        )}
        <p>
          You'll receive {hasPromoRate ? user.promoRate : user?.rate}% for every
          purchase with your partner code!
        </p>
      </CardFooter>

      {hasPromoRate ? (
        <>
          <BorderBeam
            duration={6}
            size={200}
            borderWidth={2}
            className="from-transparent via-red-500 to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={200}
            borderWidth={2}
            className="from-transparent via-blue-500 to-transparent"
          />
        </>
      ) : (
        <Meteors number={20} />
      )}
    </Card>
  );
};

export default PartnerRate;
