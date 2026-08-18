import { Profile } from "@/components/profile/profile";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full py-6">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <Profile user={session.user} />
        </div>
      </section>
    </div>
  );
}
