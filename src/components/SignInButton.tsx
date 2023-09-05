"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: sesssion, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <button
        className="bg-violet-700 py-2 px-4 rounded-lg text-white text-sm"
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <Link href="/dashboard">
        <Image
          className="rounded-full"
          src={sesssion?.user?.image!}
          alt={sesssion?.user?.name!}
          width={32}
          height={32}
        />
      </Link>
    );
  }

  return <></>;
}
