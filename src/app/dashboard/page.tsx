import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/next-auth";
import { SignOutButton } from "@/components";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-12 flex flex-col md:flex-row gap-4 md:gap-24">
      <div>
        {session?.user && (
          <>
            <h2 className="mb-1 text-3xl font-medium">{session?.user?.name}</h2>
            <p className="text-xs mb-3">{session?.user?.email}</p>
            <SignOutButton />
          </>
        )}
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-3xl text-violet-700">Purchase History</h2>
        <ul></ul>
      </div>
    </section>
  );
}
