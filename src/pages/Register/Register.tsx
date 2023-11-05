import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useRegister } from "@/api/auth/auth.ts";
import FormInput from "@/components/form/FormInput.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import logoSrc from "@/assets/logo.png";

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

type RegisterForm = {
  email: string;
  password: string;
  preferredUsername: string;
  givenName: string;
  familyName: string;
};

const defaultValues: RegisterForm = {
  email: "",
  password: "",
  preferredUsername: "",
  givenName: "",
  familyName: "",
};

export default function Register() {
  const { handleSubmit, control, formState: { isSubmitSuccessful } } = useForm<RegisterForm>({ defaultValues });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useRegister(
    async () => {
      await queryClient.refetchQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
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
                rules={{
                  required: { value: true, message: "This field is required" },
                  pattern: { value: emailRegex, message: "Must be a valid email" },
                }}
              />
              <FormInput
                name="password"
                control={control}
                label="Password"
                type="password"
                rules={{
                  required: { value: true, message: "This field is required" },
                  pattern: {
                    value: passwordRegex,
                    message: "Password must contain a minimum of eight characters, at least one letter and one number",
                  },
                }}
              />
              <FormInput
                name="preferredUsername"
                control={control}
                label="Username"
                rules={{ required: { value: true, message: "This field is required" } }}
              />
              <FormInput
                name="givenName"
                control={control}
                label="Firstname"
                rules={{ required: { value: true, message: "This field is required" } }}
              />
              <FormInput
                name="familyName"
                control={control}
                label="Lastname"
                rules={{ required: { value: true, message: "This field is required" } }}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-8">
            <Button type="submit" className="w-full select-none" disabled={isSubmitSuccessful && isPending}>
              {isSubmitSuccessful && isPending && <Loader2 className="h-4 animate-spin" />}
              <span>Register</span>
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <p>{`Already have an account?`}</p>
              <Link to="/login" className="font-bold underline">
                Login
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
