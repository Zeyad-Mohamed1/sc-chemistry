import { getUser } from "@/actions/admin/user";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user !== null) {
    return redirect("/");
  }

  return (
    <section className="w-full min-h-screen mx-auto">
      <Image
        src={"/pattern.png"}
        fill
        quality={80}
        className="object-cover -z-50"
        alt="Mountains and forests with two cabins"
        priority
      />
      <div className="py-6 w-full">{children}</div>
    </section>
  );
}
