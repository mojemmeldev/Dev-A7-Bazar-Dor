"use client";

import Image from "next/image";
import Logo from "../../../../public/logo-icon.png";
import { Button } from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setMenuOpen(false);
          router.push("/sign-in");
        },
      },
    });
  };

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="relative w-full bg-white">
      <div className="container mx-auto px-3 py-3 sm:px-4 md:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-3">

          {/* Logo + Brand */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4">

            <Link href="/" className="shrink-0">
              <Image
                src={Logo}
                alt="বাজার দর"
                width={50}
                height={50}
                priority
                className="h-10 w-10 rounded-lg bg-green-600 object-contain sm:h-11 sm:w-11 md:h-[50px] md:w-[50px]"
              />
            </Link>

            <div className="min-w-0">

              <Link href="/">
                <h2 className="whitespace-nowrap text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                  বাজার দর
                </h2>
              </Link>

              <p className="hidden text-[11px] text-gray-500 sm:block md:text-sm">
                {date}
              </p>

            </div>

          </div>


          {/* ================= Desktop Auth ================= */}

          <div className="hidden items-center gap-2 sm:flex">

            {session?.user ? (
              <>
                {/* User */}
                <Link href="/profile">
                  <div className="text-right">

                    <p className="text-[11px] text-gray-500 md:text-xs">
                      Welcome
                    </p>

                    <p className="max-w-[130px] truncate text-[13px] font-semibold text-gray-800 md:max-w-[180px] md:text-sm">
                      {session.user.name}
                    </p>

                  </div>
                </Link>

                {/* Logout */}
                <Button
                  type="button"
                  onPress={handleSignOut}
                  className="h-9 rounded-lg bg-red-50 px-3 text-[12px] font-medium text-red-600 md:h-10 md:px-4 md:text-[13px]"
                >
                  লগ আউট
                </Button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link href="/sign-in">
                  <Button
                    type="button"
                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-[12px] font-medium text-gray-700 md:h-10 md:px-4 md:text-[13px]"
                  >
                    সাইন ইন
                  </Button>
                </Link>

                {/* Sign Up */}
                <Link href="/sign-up">
                  <Button
                    type="button"
                    className="h-9 rounded-lg bg-[#079447] px-3 text-[12px] font-medium text-white md:h-10 md:px-4 md:text-[13px]"
                  >
                    সাইন আপ
                  </Button>
                </Link>
              </>
            )}

          </div>


          {/* ================= Mobile Hamburger ================= */}

          <div className="relative sm:hidden">

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl text-gray-700"
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>


            {/* Mobile Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-11 z-[100] w-[220px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">

                {session?.user ? (
                  <>
                    {/* User Info */}
                    <div className="mb-3 border-b border-gray-100 pb-3">

                      <p className="text-[11px] text-gray-500">
                        Welcome
                      </p>

                      <p className="truncate text-sm font-semibold text-gray-800">
                        {session.user.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-gray-500">
                        {session.user.email}
                      </p>

                    </div>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="mb-2 block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                    >
                      আমার প্রোফাইল
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      লগ আউট
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">

                    {/* Sign In */}
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      সাইন ইন
                    </Link>

                    {/* Sign Up */}
                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full rounded-lg bg-[#079447] px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-[#067c3c]"
                    >
                      সাইন আপ
                    </Link>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>


        {/* Mobile Date */}
        <p className="mt-2 text-[10px] text-gray-500 sm:hidden">
          {date}
        </p>

      </div>
    </header>
  );
};

export default Header;