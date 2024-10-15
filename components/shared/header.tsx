import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 mx-auto px-2 sm:px-6 lg:px-8 h-full">
      <div className="flex-1">
        <Image src={"/logo.svg"} width={100} height={60} alt={"logo"} />
      </div>
      <div className="md:flex flex-1 items-center gap-3 hidden">
        <Link
          className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-2 focus:outline-none focus:ring"
          href=""
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

          <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
            الصفحة الرئيسية
          </span>
        </Link>
        <Link
          className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
          href="#"
        >
          الصفوف
        </Link>
      </div>
      <div className="flex items-center gap-3 flex-1">
        <Link href={"/login"}>
          <Button className="bg-cyan-700 hover:bg-cyan-700/45 hover:animate-pulse flex items-center gap-1">
            <span className="text-white">تسجيل الدخول</span>
            <Image src={"/flask.png"} width={20} height={20} alt={"login"} />
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="bg-cyan-700 hover:bg-cyan-700/45 hover:rotate-2 hover:scale-110 flex items-center gap-1">
            <span className="text-white">إنشاء حساب</span>
            <Image src={"/chemist.png"} width={20} height={20} alt={"login"} />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
