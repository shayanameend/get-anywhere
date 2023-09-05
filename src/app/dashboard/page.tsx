import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-12 flex gap-24">
      <div className="py-4">
        {session?.user && (
          <>
            <h2 className="mb-1 text-3xl font-medium">{session?.user?.name}</h2>
            <p className="text-xs">{session?.user?.email}</p>
          </>
        )}
      </div>
      <div className="flex-1 py-4">
        <h2 className="font-bold text-3xl text-violet-700">Purchase History</h2>
        <ul></ul>
      </div>
    </section>
  );
}
