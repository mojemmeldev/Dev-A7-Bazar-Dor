"use client";

import { authClient, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

const ProfileUpdate = () => {
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

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(
        error.message ||
          "প্রোফাইল আপডেট করতে সমস্যা হয়েছে"
      );

      console.log("Update error:", error);

      return;
    }

    console.log("User updated:", data);

    toast.success(
      "নাম সফলভাবে আপডেট হয়েছে"
    );
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
    <section className="min-h-[600px] bg-green-50 px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-xl">

        {/* Current User */}
        <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:mb-5 sm:p-5 md:p-6">
          <h2 className="break-words text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
            {session.user.name}
          </h2>

          <p className="mt-1 break-all text-[13px] text-gray-500 sm:text-sm">
            {session.user.email}
          </p>
        </div>

        {/* Update Form */}
        <form
          onSubmit={handleUpdate}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6"
        >
          <h3 className="mb-4 text-base font-semibold text-gray-800 sm:mb-5 sm:text-lg">
            তথ্য
          </h3>

          <label className="mb-2 block text-[13px] font-medium text-gray-700 sm:text-sm">
            নাম
          </label>

          <input
            type="text"
            name="name"
            defaultValue={session.user.name}
            required
            className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:h-12 sm:px-4 sm:text-base"
          />

          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-lg bg-green-600 text-sm font-medium text-white transition hover:bg-green-700 active:scale-[0.99] sm:h-12 sm:text-base"
          >
            আপডেট
          </button>
        </form>

      </div>
    </section>
  );
};

export default ProfileUpdate;