"use client";

import { authClient, updateUser } from "@/lib/auth-client";

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

    const name = formData.get("name") as string;

    const { data, error } = await updateUser({
      name,
    });

    if (error) {
      console.log("Update error:", error);
      return;
    }

    console.log("User updated:", data);
    alert("নাম সফলভাবে আপডেট হয়েছে");
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!session?.user) {
    return <p>আপনি লগইন করেননি</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">

      {/* Current User */}
      <div className="bg-white rounded-xl p-5 mb-5">
        <h2 className="font-bold text-xl">
          {session.user.name}
        </h2>

        <p className="text-gray-500">
          {session.user.email}
        </p>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-xl p-6"
      >
        <h3 className="font-semibold mb-5">
          তথ্য
        </h3>

        <label className="block mb-2">
          নাম
        </label>

        <input
          type="text"
          name="name"
          defaultValue={session.user.name}
          className="w-full border rounded-lg px-4 py-3"
          required
        />

        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg"
        >
          আপডেট
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;