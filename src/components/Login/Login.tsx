import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "@/store/authProvider";
import { Spinner } from "../ui/spinner";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Partner | Login";
  }, []);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg("");

    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        if (err.response.status === 404) {
          setErrorMsg("Invalid email or password");
        } else if (err.response.status === 429) {
          setErrorMsg("Too many requests, try again later");
        } else {
          setErrorMsg("An error occurred");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto md:w-1/2 lg:w-1/4">
      <CardHeader>
        <CardTitle>Login to your partner account</CardTitle>
        <CardDescription>
          Enter your Born Again account credentials to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="email@bornagain.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="Password"
                name="password"
                required
              />
            </div>
          </div>
        </form>
        {errorMsg && <div className="text-destructive">{errorMsg}</div>}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full">
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
