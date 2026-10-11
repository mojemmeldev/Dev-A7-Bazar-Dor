"use client";

import {
  authClient,
  signOut,
  updateUser,
} from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData
      .get("name")
      ?.toString()
      .trim();

    if (!name) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    const loadingToast = toast.loading(
      "প্রোফাইল আপডেট হচ্ছে..."
    );

    const { data, error } = await updateUser({
      name,
    });

    if (error) {
      toast.error(
        error.message ||
          "প্রোফাইল আপডেট করতে সমস্যা হয়েছে",
        {
          id: loadingToast,
        }
      );

      console.log("Update error:", error);
      return;
    }

    toast.success(
      "নাম সফলভাবে আপডেট হয়েছে",
      {
        id: loadingToast,
      }
    );

    console.log("User updated:", data);

    router.refresh();
  };

  const handleSignOut = async () => {
    const loadingToast = toast.loading(
      "সাইন আউট হচ্ছে..."
    );

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success(
            "সফলভাবে সাইন আউট হয়েছে",
            {
              id: loadingToast,
            }
          );

          router.push("/sign-in");
          router.refresh();
        },

        onError: () => {
          toast.error(
            "সাইন আউট করতে সমস্যা হয়েছে",
            {
              id: loadingToast,
            }
          );
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 text-sm text-gray-500 sm:min-h-[500px] sm:text-base">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 text-center text-sm text-gray-600 sm:min-h-[500px] sm:text-base">
        আপনি লগইন করেননি
      </div>
    );
  }

  return (
    <section className="min-h-[650px] bg-[#f4f8f3] px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-12 lg:py-16">

      <div className="mx-auto w-full max-w-[650px]">

        {/* Page Heading */}
        <div className="mb-5 sm:mb-7">

          <h1 className="text-[22px] font-bold text-[#1d2921] sm:text-[26px] md:text-[28px]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-[12px] leading-5 text-gray-500 sm:text-[14px]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>

        </div>


        {/* User Card */}
        <div className="mb-4 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 md:px-6">

          {/* User Info */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            {/* User Image */}
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-base font-bold text-green-700 sm:h-12 sm:w-12 sm:text-lg">
                {session.user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            )}

            {/* User Details */}
            <div className="min-w-0 flex-1">

              <h2 className="break-words text-[15px] font-semibold text-gray-800 sm:text-[17px]">
                {session.user.name}
              </h2>

              <p className="mt-1 break-all text-[11px] text-gray-500 sm:text-[13px]">
                {session.user.email}
              </p>

            </div>

          </div>


          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-md border border-red-400 px-4 py-2 text-[12px] font-medium text-red-500 transition hover:bg-red-50 sm:w-auto sm:shrink-0 sm:text-[13px]"
          >
            ↪ সাইন আউট
          </button>

        </div>


        {/* Information Card */}
        <form
          onSubmit={handleUpdate}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:px-6 sm:py-5 md:px-7 md:py-6"
        >

          <h2 className="mb-5 text-[15px] font-semibold text-gray-800 sm:mb-7 sm:text-[16px]">
            তথ্য
          </h2>


          {/* Name */}
          <div>

            <label className="mb-2 block text-[12px] font-medium text-gray-600 sm:text-[13px]">
              নাম
            </label>

            <input
              type="text"
              name="name"
              defaultValue={session.user.name}
              required
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:h-[45px] sm:px-4 sm:text-[14px]"
            />

          </div>


          {/* Update Button */}
          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-md bg-[#079447] text-[13px] font-medium text-white transition hover:bg-[#067c3c] active:scale-[0.99] sm:mt-5 sm:h-[44px] sm:text-[14px]"
          >
            আপডেট
          </button>

        </form>

      </div>

    </section>
  );
};

export default ProfilePage;