"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/slices/userSlice";
import { House, LogOut, PackageOpen, UserRoundCog } from "lucide-react";

const menu = [
  {
    name: "الصفحة الرئيسية",
    href: "/",
    icon: <House />,
  },
  {
    name: "كورساتي",
    href: "/my-courses",
    icon: <PackageOpen />,
  },
];
const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAdmin, ...rest } = data || {};

  useEffect(() => {
    dispatch(setUser(rest));
  }, [data, dispatch, rest]);

  return (
    <header className="w-full max-w-xl md:max-w-4xl lg:max-w-6xl">
      <div className="flex items-center justify-between py-4 mx-auto px-2 sm:px-6 lg:px-8 h-full">
        {data ? (
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="inline-flex items-center overflow-hidden gap-2 cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full p-2 bg-muted">
                <UserRoundCog className="size-4 text-white" />
              </div>
              <p className="font-medium text-base text-gray-700">
                مرحبا {data?.firstName}
              </p>
            </div>

            {open && (
              <div
                className="absolute end-auto z-10 mt-2 w-[170px] rounded-[6px] border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-3">
                  {menu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-[6px] py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-1"
                      role="menuitem"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full p-2 bg-muted">
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                  <div className="block cursor-pointer rounded-[6px] py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full p-2 bg-muted">
                        <LogOut />
                      </div>
                      <span>تسجيل الخروج</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/sign-up"}>
              <Button
                variant={"outline"}
                className="hover:-rotate-2 hover:scale-110 max-sm:text-xs flex items-center gap-1 rounded-full px-3 md:px-6 transition-all delay-75"
              >
                <Image
                  src={"/register.png"}
                  width={20}
                  height={20}
                  alt={"login"}
                  priority
                />
                <span className="text-primary">إنشاء حساب</span>
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="rounded-full max-sm:text-xs px-3 md:px-6 hover:animate-pulse flex items-center gap-1 transition-all">
                <Image
                  src={"/login.png"}
                  width={20}
                  height={20}
                  alt={"login"}
                  className="mt-1"
                  priority
                />
                <span className="text-secondary">تسجيل الدخول</span>
              </Button>
            </Link>
          </div>
        )}

        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={120}
            height={80}
            alt={"logo"}
            priority
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
