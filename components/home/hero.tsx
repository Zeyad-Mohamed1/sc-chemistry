"use client";
import Image from "next/image";
import { CustomButton } from "../shared/custom-button";
import Link from "next/link";
import { DropdownMenuYears } from "../shared/drop-down-menu";
import { motion } from "framer-motion";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hero = () => {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full mx-auto px-2 sm:px-6 lg:px-8 pb-10">
      <Image
        src={"/pattern.png"}
        fill
        quality={80}
        className="object-cover -z-50"
        alt="hero image"
        priority
      />

      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center  gap-2 md:gap-5 lg:gap-10">
        <motion.div
          initial="right"
          animate="visible"
          variants={MULTIDIRECTION_SLIDE_VARIANTS}
          transition={{ duration: 1 }}

          // className="flex-1 w-full text-right"
        >
          <div className="flex flex-1 w-full flex-col gap-5 items-center text-right">
            <div className="font-extrabold text-5xl lg:text-6xl flex items-center flex-row-reverse gap-2">
              <p className="text-primary text">سلوي عبد العزيز</p>
              <p className="text-muted"> أ .</p>
            </div>

            <h3 className="md:text-2xl text-xl font-bold my-4">
              افهمها- حلها- قفلها
            </h3>

            <div className="flex items-center gap-5">
              <Link href={"/sign-in"}>
                <CustomButton className="rounded-full text-white bg-secondary">
                  <p>سجل معنا...</p>
                </CustomButton>
              </Link>
              <DropdownMenuYears />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={MULTIDIRECTION_SLIDE_VARIANTS}
          transition={{ duration: 1 }}
          // className="flex-1 flex items-center justify-center"
        >
          <video
            src={"/hero.mp4"}
            loop
            autoPlay
            muted
            width={450}
            height={450}
            className="object-contain max-sm:h-[30rem]"
            onError={(e) => {
              console.error("Error loading video:", e);
            }}
          ></video>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
