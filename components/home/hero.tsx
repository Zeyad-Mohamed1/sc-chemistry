import Image from "next/image";
import { CustomButton } from "../shared/custom-button";
import Link from "next/link";
import { DropdownMenuYears } from "../shared/drop-down-menu";

const Hero = () => {
  return (
    <div className="w-full relative min-h-screen mx-auto">
      <Image
        src={"/pattern.png"}
        fill
        quality={80}
        className="object-cover -z-50"
        alt="Mountains and forests with two cabins"
        priority
      />

      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 w-full flex flex-col md:flex-row items-center justify-center">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={"/hero.png"}
            width={450}
            height={450}
            className="object-contain max-sm:h-[30rem] floating-image"
            alt="Mountains and forests with two cabins"
            priority
          />
        </div>

        <div className="flex-1 w-full text-right">
          <div className="flex w-full flex-col gap-5 items-center">
            <div className="font-extrabold text-5xl lg:text-6xl flex items-center flex-row-reverse gap-2">
              <p className="text-muted">. أ</p>
              <p className="text-primary text">سلوي عبد العزيز</p>
            </div>

            <h3 className="md:text-2xl text-xl font-bold my-4">
              !اكتشف سحر الكيمياء و اطلق طاقتك معنا
            </h3>

            <div className="flex items-center gap-5">
              <DropdownMenuYears />

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
                  <p className="mr-3">...سجل معنا</p>
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
