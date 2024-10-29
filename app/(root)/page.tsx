import { getUser } from "@/actions/admin/user";
import Hero from "@/components/home/hero";
import WhyUs from "@/components/home/why-us";
import Years from "@/components/home/years";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <Hero user={user} />
      <WhyUs />
      <Years />
    </>
  );
}
