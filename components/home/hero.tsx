"use client";
import Image from "next/image";
import { CustomButton } from "../shared/custom-button";
import Link from "next/link";
import { DropdownMenuYears } from "../shared/drop-down-menu";
import { useEffect } from "react";
import { setUser } from "@/lib/slices/userSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hero = ({ user }: any) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAdmin, ...rest } = user || {};

  useEffect(() => {
    if (user === null) {
      dispatch(setUser(null));
    } else {
      dispatch(setUser(rest));
    }
  }, [user, dispatch, rest]);

  return (
    <div className="w-full min-h-screen mx-auto z-0">
      <Image
        src={"/pattern.png"}
        fill
        quality={80}
        className="object-cover -z-50"
        alt="Mountains and forests with two cabins"
        priority
      />

      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="flex-1 w-full text-right">
          <div className="flex w-full flex-col gap-5 items-center">
            <div className="font-extrabold text-5xl lg:text-6xl flex items-center flex-row-reverse gap-2">
              <p className="text-primary text">سلوي عبد العزيز</p>
              <p className="text-muted"> أ .</p>
            </div>

            <h3 className="md:text-2xl text-xl font-bold my-4">
              اكتشف سحر الكيمياء و اطلق طاقتك معنا!
            </h3>

            <div className="flex items-center gap-5">
              <Link href={"/sign-in"}>
                <CustomButton className="rounded-full text-white bg-secondary">
                  <div className="absolute right-[-10px] top-[-8px] max-sm:right-[-25px]">
                    <Image
                      src={"/flask.png"}
                      width={35}
                      height={35}
                      alt={"login"}
                      className=""
                    />
                  </div>
                  <p className="mr-3">سجل معنا...</p>
                </CustomButton>
              </Link>
              <DropdownMenuYears />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={"/hero.png"}
            width={450}
            height={450}
            className="object-contain max-sm:h-[30rem] floating-image z-0"
            alt="Mountains and forests with two cabins"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
