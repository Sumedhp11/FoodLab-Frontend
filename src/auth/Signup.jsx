import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signupAPI } from "./authAPI";
import { useMutation } from "@tanstack/react-query";
import createUserSchema from "@/schema/Create-UserSchema";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/loader";

const Signup = () => {
  const isloggedIn = localStorage.getItem("IsloggenIn");
  const [isLoadingCheck, setIsLoadingCheck] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast({
        description: "Registration Sucessfully",
      });
      navigate("/");
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
    <div className=" h-screen overflow-y-hidden">
      <NavBar />
      <section className="flex w-full mt-24 h-full justify-center">
        <Card className="w-1/3 border border-white h-fit py-4 shadow-[0px_2px_49px_2px_#2f855a] ">
          <CardHeader>
            <CardTitle className="text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div className="w-full flex items-center gap-3 ">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name:</FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                className="border border-black"
                                {...field}
                                type="text"
                                placeholder="Enter your name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                className="border border-black"
                                {...field}
                                type="text"
                                placeholder="Enter your email"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password:</FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                className="border border-black"
                                {...field}
                                type="password"
                                placeholder="Enter your Password"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password:</FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input
                                className="border border-black"
                                {...field}
                                type="password"
                                placeholder="Re-enter your Password"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number:</FormLabel>
                        <FormMessage />
                        <FormControl>
                          <Input
                            className="border border-black"
                            {...field}
                            type="text"
                            placeholder="Enter your phone number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      className="bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Sign Up"}
                    </Button>
                    <div className="font-normal text-base">
                      <span>Already have an account?</span>{" "}
                      <Link to={"/"}>
                        <span>Sign in</span>
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
export default Signup;
