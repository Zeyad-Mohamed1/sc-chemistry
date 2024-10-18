import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="absolute top-0 w-full z-50 max-w-xl md:max-w-4xl lg:max-w-6xl">
      <div className="flex items-center justify-between py-4 mx-auto px-2 sm:px-6 lg:px-8 h-full">
        <Link href={"/"} className="flex-1">
          <Image
            src={"/logo.png"}
            width={120}
            height={80}
            alt={"logo"}
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link href={"/sign-in"}>
            <Button className="rounded-full max-sm:text-xs px-3 md:px-6 hover:animate-pulse flex items-center gap-1 transition-all delay-500">
              <span className="text-secondary">تسجيل الدخول</span>
              <Image
                src={"/login.png"}
                width={20}
                height={20}
                alt={"login"}
                className="mt-1"
              />
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button
              variant={"outline"}
              className="hover:-rotate-2 hover:scale-110 max-sm:text-xs flex items-center gap-1 rounded-full px-3 md:px-6 transition-all delay-75"
            >
              <span className="text-primary">إنشاء حساب</span>
              <Image
                src={"/register.png"}
                width={20}
                height={20}
                alt={"login"}
              />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
