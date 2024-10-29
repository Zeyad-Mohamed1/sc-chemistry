import Image from "next/image";

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
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="relative w-14 h-14 flex-center-both rounded-full font-h1 hover-shadow smooth undefined"
          rel="noreferrer"
        >
          <span className="relative">
            <Image
              width={50}
              height={50}
              src="/fb.png"
              alt="Youtube"
              className="w-12 h-auto"
            />
          </span>
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          className="relative w-14 h-14 flex-center-both rounded-full font-h1 hover-shadow smooth undefined"
          rel="noreferrer"
        >
          <span className="relative">
            <Image
              width={50}
              height={50}
              src="/yt.png"
              alt="Youtube"
              className="w-12 h-auto"
            />
          </span>
        </a>
      </div>
      <div className="h-1 bg-slate-800 rounded-md w-2/3 sm:w-1/3 "></div>
      <div className="flex items-center justify-center space-x-5 space-x-reverse px-5">
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
          تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة و ما
          بعدها
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
            href="https://www.facebook.com/"
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
