import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginSchema from "@/schema/LoginSchema";
import { Eye, EyeOff } from "lucide-react";
import Loader from "@/loader";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { loginAPI } from "./authAPI";

const Login = () => {
  const isloggedIn = localStorage.getItem("IsloggenIn");
  const [isLoadingCheck, setIsLoadingCheck] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      toast({
        description: "Login Sucessfully",
      });
      form.reset();
      localStorage.setItem("IsloggenIn", true);
      navigate("/restaurants");
      console.log(data);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });

  const onSubmit = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  useEffect(() => {
    setIsLoadingCheck(true);
    if (isloggedIn === "true") {
      navigate("/restaurants");
    } else {
      setIsLoadingCheck(false);
    }
  }, [isloggedIn, navigate]);

  if (isLoadingCheck) {
    return <Loader />;
  }

  return (
    <div className="bg-black h-screen overflow-y-hidden">
      <NavBar />
      <section className="flex w-full mt-24 h-full justify-center">
        <Card className="w-1/3 border border-white h-fit py-4 ">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-black"
                            {...field}
                            type="text"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors?.email?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex justify-between">
                            <h3>Password:</h3>
                            <h3>Forgot Password?</h3>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="border border-black"
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your Password"
                            />
                            {showPassword ? (
                              <EyeOff
                                className="absolute top-2 right-3 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <Eye
                                className="absolute top-2 right-3 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      className="bg-black"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Sign In"}
                    </Button>
                    <div className="font-normal text-base">
                      <span>New Here?</span>
                      <Link to={"/signup"}>
                        <span className="ml-2">Signup</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Login;
