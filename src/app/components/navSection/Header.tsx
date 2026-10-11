"use client";

import Image from "next/image";
import Logo from "../../../../public/logo-icon.png";
import { Button } from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Logo + Brand */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            <Link href="/" className="shrink-0">
              <Image
                src={Logo}
                alt="বাজার দর"
                width={50}
                height={50}
                priority
                className="h-10 w-10 rounded-lg bg-green-600 object-contain sm:h-[50px] sm:w-[50px]"
              />
            </Link>

            <div className="min-w-0">

              <Link href="/">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  বাজার দর
                </h2>
              </Link>

              <p className="mt-0.5 text-[11px] text-gray-500 sm:text-[13px] md:text-sm">
                {date}
              </p>

            </div>
          </div>

          {/* Auth Section */}
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">

            {session?.user ? (
              <>
                {/* Logged In User */}
                <Link
                  href="/profile"
                  className="min-w-0 flex-1 sm:flex-none"
                >
                  <div className="text-left sm:text-right">

                    <p className="text-[11px] text-gray-500 sm:text-xs">
                      Welcome
                    </p>

                    <p className="max-w-[150px] truncate text-[13px] font-semibold text-gray-800 sm:max-w-[180px] sm:text-sm">
                      {session.user.name}
                    </p>

                  </div>
                </Link>

                <Button
                  type="button"
                  onClick={handleSignOut}
                  className="h-9 shrink-0 rounded-lg bg-red-50 px-3 text-[12px] font-medium text-red-600 sm:h-10 sm:px-4 sm:text-[13px]"
                >
                  লগ আউট
                </Button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link href="/sign-in" className="flex-1 sm:flex-none">
                  <Button
                    type="button"
                    className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-[12px] font-medium text-gray-700 sm:h-10 sm:w-auto sm:px-4 sm:text-[13px]"
                  >
                    সাইন ইন
                  </Button>
                </Link>

                {/* Sign Up */}
                <Link href="/sign-up" className="flex-1 sm:flex-none">
                  <Button
                    type="button"
                    className="h-9 w-full rounded-lg bg-[#079447] px-3 text-[12px] font-medium text-white sm:h-10 sm:w-auto sm:px-4 sm:text-[13px]"
                  >
                    সাইন আপ
                  </Button>
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;