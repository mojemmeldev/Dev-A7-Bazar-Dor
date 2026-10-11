"use client";

import { signIn } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField, } from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";

const SignInPage = () => {

  // Email + Password Sign In


  const onSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => { e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      toast.error( error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়" );
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে");
  };


  // Invalid Form


  const handleInvalid = ( e: React.FormEvent<HTMLFormElement> ) => { e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData .get("email") ?.toString() .trim();

    const password = formData .get("password") ?.toString() .trim();

    if (!email && !password) {
      toast.error(
        "ইমেইল এবং পাসওয়ার্ড ফাঁকা রাখা যাবে না",
        {
          id: "signin-validation",
        }
      );
      return;
    }

    if (!email) {
      toast.error("ইমেইল ফাঁকা রাখা যাবে না", {
        id: "signin-validation",
      });
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড ফাঁকা রাখা যাবে না", {
        id: "signin-validation",
      });
      return;
    }

    toast.error(
      "ফর্মের তথ্য সঠিকভাবে পূরণ করুন",
      {
        id: "signin-validation",
      }
    );
  };

 
  // Google Sign In

  const signInForGoogle = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        error.message || "Google Sign In ব্যর্থ হয়েছে"
      );
    }
  };

  // GitHub Sign In

  const signInForGithub = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        error.message || "GitHub Sign In ব্যর্থ হয়েছে"
      );
    }
  };

  return (
    <section className="min-h-[650px] bg-[#f4f8f3] px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[430px]">

        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-[26px] font-bold text-[#1e2922] sm:text-[30px]">
            সাইন ইন
          </h1>

          <p className="mx-auto mt-2 max-w-[360px] text-[13px] leading-6 text-gray-500 sm:text-[14px]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[14px] border border-[#dce4dc] bg-white p-4 shadow-sm sm:rounded-[16px] sm:p-6">
          <Form className="flex w-full flex-col gap-4 sm:gap-5"
          onSubmit={onSubmit} onInvalid={handleInvalid} >

            {/* Email */}
            <TextField isRequired name="email" type="email" className="w-full" 
            validate={(value) => {
                if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( value ) ) { 
                  return "Please enter a valid email address"; } return null; }}>
              <Label className="mb-1 text-[13px] font-medium text-gray-700 sm:text-[14px]">
                ইমেইল
              </Label>

              <Input placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none transition focus:border-green-500 sm:px-4"/>
              <FieldError className="mt-1 text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField isRequired minLength={8} name="password" type="password" className="w-full"
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

            {/* Sign In Button */}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#079447] text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#067d3d] sm:text-[15px]"
            >
              সাইন ইন
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1 sm:gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-[13px] text-gray-500 sm:text-sm">
                অথবা
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social Buttons */}
            <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">

              {/* Google */}
              <Button
                type="button"
                variant="secondary"
                onPress={signInForGoogle}
                className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[12px] font-medium text-gray-700 shadow-none hover:bg-gray-50 sm:px-3 sm:text-[13px]"
              >
                <span className="shrink-0 text-lg font-bold text-blue-500">
                  G
                </span>

                <span className="truncate">
                  Google
                </span>
              </Button>

              {/* GitHub */}
              <Button
                type="button"
                variant="secondary"
                onPress={signInForGithub}
                className="flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[12px] font-medium text-gray-700 shadow-none hover:bg-gray-50 sm:px-3 sm:text-[13px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.17 1.19a11 11 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
                </svg>

                <span className="truncate">
                  GitHub
                </span>
              </Button>
            </div>

            {/* Sign Up */}
            <div className="pt-1 text-center text-[13px] leading-6 text-gray-600 sm:text-[14px]">
              অ্যাকাউন্ট নেই?{" "}

              <Link
                href="/sign-up"
                className="font-medium text-[#079447] hover:underline"
              >
                সাইন আপ করুন
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

export default SignInPage;