import { getUser } from "@/actions/user";
import Hero from "@/components/home/hero";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <Hero user={user} />
    </>
  );
}
