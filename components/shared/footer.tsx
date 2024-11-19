import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "https://www.facebook.com/profile.php?id=61568828166461",
    img: "/facebook.png",
  },
  {
    href: "https://www.youtube.com/@Salwa-Chemistry",
    img: "/youtube.png",
  },
  {
    href: "mailto:salwachemistry@gmail.com",
    img: "/gmail.png",
  },
  {
    href: "https://t.me/RandomName205",
    img: "/telegram.png",
  },
];

const Footer = () => {
  return (
    <div className="footer bg-primary py-20 text-white flex justify-center items-center flex-col space-y-10 w-full ">
      <div>
        <Image
          src="/logo.png"
          alt="footerLogo"
          width={150}
          height={150}
          className="w-[150px] h-auto"
        />
      </div>
      <div className="flex items-center justify-center space-x-5 space-x-reverse">
        {links.slice(0, 2).map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="relative w-14 h-14 flex-center-both rounded-full font-h1 hover-shadow smooth undefined"
          >
            <span className="relative">
              <Image
                width={50}
                height={50}
                src={link.img}
                alt="logo"
                className="w-12 h-auto"
              />
            </span>
          </a>
        ))}
      </div>
      <div className="h-1 bg-slate-800 rounded-md w-2/3 sm:w-1/3 "></div>

      <div className="flex flex-col justify-center items-center gap-5">
        <Link href="/terms-and-conditions">
          <span className="text-slate-200 text-center shrink underline">
            الشروط و الاحكام و سياسة الخصوصية
          </span>
        </Link>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <p className="text-slate-200 text-center shrink">تواصل معنا:</p>
            <div className="flex items-center gap-2">
              {links.slice(2, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-14 h-14 flex-center-both rounded-full font-h1 hover-shadow smooth undefined"
                >
                  <span className="relative">
                    <Image
                      width={20}
                      height={20}
                      src={link.img}
                      alt="logo"
                      className="h-auto w-7"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-slate-200 text-center shrink">أو اتصل بنا:</p>
            <div className="flex items-center gap-2 bg-slate-300 rounded-[5px] p-2">
              <span className="text-slate-800 text-center shrink">
                201016046701+
              </span>
              <PhoneCall size={20} className="text-slate-800" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col gap-3">
        <div className="flex items-center justify-center space-x-3 space-x-reverse px-5">
          <span className="">
            <Image
              width={60}
              height={60}
              src="/labs.png"
              className="w-12 animate-pulse h-auto -rotate-[10deg]"
              alt="flask"
            />
          </span>
          <span className="text-slate-200 text-center shrink">
            تمت صناعة محتوى المنصة بكل حب و ضمير بهدف إفادة الطالب لأقصى درجة
            ممكنة في الثانوية و ما بعدها
          </span>
          <span className="">
            <Image
              width={60}
              height={60}
              src="/labs.png"
              className="w-12 animate-pulse delay-150 h-auto rotate-[10deg]"
              alt="flask"
            />
          </span>
        </div>
      </div>

      <div
        dir="ltr"
        className="text-center font-com space-x-2 opacity-90 px-5 flex flex-wrap justify-center items-center"
      >
        <span className="font-w-bold space-x-1">
          <span className="text-vividCyan-600">&lt;</span>
          <span className="text-vividCyan-300">Developed By</span>
          <span className="text-vividCyan-600">&gt;</span>
        </span>
        <span>
          <a
            href="https://www.facebook.com/zeyad.mohamed.6"
            target="_blank"
            className="hover-shadow smooth px-2 py-2 rounded-[.375rem]"
          >
            Zeyad
          </a>
        </span>

        <span className="font-bold space-x-1">
          <span className="text-vividCyan-600">&lt;</span>
          <span className="text-vividCyan-300">
            All Copy Rights Reserved @2024
          </span>
          <span className="text-vividCyan-600">&gt;</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
