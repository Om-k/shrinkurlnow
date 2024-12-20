"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabaseClient";

const Signup = () => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const router = useRouter();

  const onSubmit = async (data) => {
    try{
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username
          }
        }
      });
      if (error) {
        console.error("Error signing up:", error.message);
        alert("Error signing up: " + error.message); 
      } else {
        router.push("/dashboard")
      }
    }catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred. Please try again.");
    }
  };


  return (
    <section className="flex flex-col max-w-md w-full space-y-4 section">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full m-auto"
        >
          <Input
            type="text"
            label="Username"
            className="focus:outline-none focus:border-purple-900 focus:ring-2"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters",
              },
            })}
            error={errors.username}
          />
          <Input
            type="email"
            label="Email"
            className="focus:outline-none focus:border-purple-900 focus:ring-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            className="focus:outline-none focus:border-purple-900 focus:ring-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            error={errors.password}
          />
          <Button type="submit" className="bg-purple-900 text-white dark:bg-purple-900 dark:text-white hover:bg-purple-600 dark:hover:bg-purple-600 w-full">
            Sign Up
          </Button>
        </form>
        <small className="text-center  text-black  dark:text-white ">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold hover:font-bold text-purple-900 dark:text-purple-900 hover:text-purple-600 dark:hover:text-purple-600">
            Sign In
          </Link>
        </small>
      </FormProvider>
    </section>
  );
};

export default Signup;
