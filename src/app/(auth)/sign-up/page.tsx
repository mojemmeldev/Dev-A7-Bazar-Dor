"use client";

import React from "react";
import { Button, FieldError, Form, Input, Label, TextField, } from "@heroui/react";

import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUpPage = () => {
  // Email + Password Sign Up

  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => { e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const name = data.name?.trim();
    const email = data.email?.trim();
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    // Empty field validation
    if ( !name || !email || !password || !confirmPassword ) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    // Better Auth Sign Up
    const { data: signUpData, error, } = await signUp.email({ name, email, password, callbackURL: "/", });
    if (error) {
      toast.error( error.message || "সাইন আপ করতে সমস্যা হয়েছে" );
      console.log("SignUp error:", error);
      return;
    }

    toast.success( "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে" );
  };


  // Invalid Form

const handleInvalid = ( e: React.FormEvent<HTMLFormElement> ) => { e.preventDefault();

    toast.error( "ফর্মের তথ্য সঠিকভাবে পূরণ করুন", { id: "signup-validation", } ); };


  // Google

  const signInForGoogle = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error( error.message || "Google দিয়ে চালিয়ে যেতে সমস্যা হয়েছে" );
    }
  };



  // GitHub

  const signInForGithub = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error( error.message || "GitHub দিয়ে চালিয়ে যেতে সমস্যা হয়েছে" );
    }
  };

  return (
    <section className="min-h-[720px] bg-[#f4f8f3] px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-14 lg:py-16">

      <div className="mx-auto w-full max-w-[440px]">

        {/* Heading */}
        <div className="mb-6 text-center sm:mb-7">

          <h1 className="text-[25px] font-bold leading-tight text-[#1e2922] sm:text-[30px]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mx-auto mt-2 max-w-[360px] text-[13px] leading-6 text-gray-500 sm:text-[14px]">
            বিনা খরচে সাইন আপ করে সব ফিচার ব্যবহার করুন
          </p>

        </div>

        {/* Sign Up Card */}
        <div className="rounded-[14px] border border-[#dce4dc] bg-white p-4 shadow-sm sm:rounded-[16px] sm:p-6">

          <Form
            className="flex w-full flex-col gap-4 sm:gap-5"
            onSubmit={onSubmit}
            onInvalid={handleInvalid}
          >

            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="w-full"
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "Name must be at least 3 characters";
                }

                return null;
              }}
            >

              <Label className="mb-1 text-[13px] font-medium text-gray-700 sm:text-[14px]">
                নাম
              </Label>

              <Input
                placeholder="যেমন: রহিম উদ্দিন"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none transition focus:border-green-500 sm:px-4"
              />

              <FieldError className="mt-1 text-xs text-red-500" />

            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( value ) ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >

              <Label className="mb-1 text-[13px] font-medium text-gray-700 sm:text-[14px]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none transition focus:border-green-500 sm:px-4"
              />

              <FieldError className="mt-1 text-xs text-red-500" />

            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >

              <Label className="mb-1 text-[13px] font-medium text-gray-700 sm:text-[14px]">
                পাসওয়ার্ড
              </Label>

              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none transition focus:border-green-500 sm:px-4"
              />

              <FieldError className="mt-1 text-xs text-red-500" />

            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              minLength={8}
              name="confirmPassword"
              type="password"
              className="w-full"
            >

              <Label className="mb-1 text-[13px] font-medium text-gray-700 sm:text-[14px]">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                placeholder="আবার লিখুন"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none transition focus:border-green-500 sm:px-4"
              />

              <FieldError className="mt-1 text-xs text-red-500" />

            </TextField>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#079447] text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#067c3c] sm:text-[15px]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1 sm:gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="shrink-0 text-[13px] text-gray-500">
                অথবা
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* Social Login */}
            <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">

              {/* Google */}
              <Button
                type="button"
                variant="secondary"
                onPress={signInForGoogle}
                className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[12px] font-medium text-gray-700 shadow-none transition hover:bg-gray-50 sm:px-3 sm:text-[13px]"
              >

                <span className="shrink-0 text-lg font-bold text-blue-500">
                  G
                </span>

                <span className="sm:hidden">
                  Google
                </span>

                <span className="hidden truncate sm:inline">
                  Google
                </span>

              </Button>

              {/* GitHub */}
              <Button
                type="button"
                variant="secondary"
                onPress={signInForGithub}
                className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[12px] font-medium text-gray-700 shadow-none transition hover:bg-gray-50 sm:px-3 sm:text-[13px]"
              >

                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.17 1.19a11 11 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
                </svg>

                <span className="sm:hidden">
                  GitHub
                </span>

                <span className="hidden truncate sm:inline">
                  GitHub
                </span>

              </Button>

            </div>

            {/* Existing Account */}
            <div className="text-center text-[13px] leading-6 text-gray-600 sm:text-[14px]">

              অ্যাকাউন্ট আছে?{" "}

              <Link
                href="/sign-in"
                className="font-medium text-[#079447] hover:underline"
              >
                সাইন ইন করুন
              </Link>

            </div>

          </Form>

        </div>

        {/* Back Home */}
        <div className="mt-6 text-center sm:mt-8">

          <Link
            href="/"
            className="text-[13px] text-gray-500 transition hover:text-green-700 sm:text-[14px]"
          >
            ← হোম পেজে ফিরে যান
          </Link>

        </div>

      </div>

    </section>
  );
};

export default SignUpPage;