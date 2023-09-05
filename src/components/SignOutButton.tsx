"use client";

import { signOut, useSession } from "next-auth/react";

export default function SignOutButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <button
        className="bg-violet-700 py-2 px-4 rounded-lg text-white text-sm"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    );
  }

  return <></>;
}
