import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "@/api/auth/auth.ts";
import FormInput from "@/components/form/FormInput.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { useAuth } from "@/provider/AuthProvider.tsx";
import logoSrc from "@/assets/logo.png";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";

type LoginForm = {
  email: string;
  password: string;
};

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<LoginForm>({ defaultValues });
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin(
    (data) => {
      setToken(data.token);
      navigate("/");
    },
    () => {
      toast({
        description: "Bad credentials",
        variant: "destructive",
      });
      reset(defaultValues, { keepValues: true });
    }
  );

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-6 bg-accent p-10">
      <div className="-mt-10 flex flex-col items-center">
        <div className="w-16">
          <AspectRatio ratio={6 / 5} className="-mt-0.5">
            <img src={logoSrc} alt="Image" />
          </AspectRatio>
        </div>
        <h2 className="text-xl font-bold">ParkirAI</h2>
      </div>
      <form onSubmit={handleSubmit((data) => login(data))}>
        <Card className="w-96 p-2">
          <CardHeader className="mb-8">
            <CardTitle className="flex justify-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-full w-full flex-col gap-4">
              <FormInput
                name="email"
                control={control}
                label="Email"
                rules={{ required: { value: true, message: "This field is required" } }}
              />
              <FormInput
                name="password"
                control={control}
                label="Password"
                type="password"
                rules={{ required: { value: true, message: "This field is required" } }}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-8">
            <Button type="submit" className="w-full select-none" disabled={isSubmitSuccessful && isPending}>
              {isSubmitSuccessful && isPending && <Loader2 className="h-4 animate-spin" />}
              <span>Login</span>
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <p>{`Don't have an account?`}</p>
              <Link to="/register" className="font-bold underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
      <div className="mt-2 flex items-center gap-6">
        <div className="w-14"></div>
      </div>
    </div>
  );
}
