import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
