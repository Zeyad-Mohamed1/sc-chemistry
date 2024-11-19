import { Year } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const YearCard = ({ name, image }: Year) => {
  return (
    <div className="group">
      <div className="rounded-[.375rem] overflow-hidden w-full relative">
        <Image
          src={image == null ? "/iphone.png" : image}
          alt={name}
          width={500}
          height={500}
          className=" w-full transform text-center md:max-w-[500px] group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth"
        />
        {/* <img
          src={image == null ? "/iphone.png" : image}
          alt="course"
          className=" w-full transform text-center md:max-w-[500px] group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth"
        /> */}
      </div>
      <div className="px-5 -mt-10 relative z-10">
        <Link href={`/courses/${name}`}>
          <div className="rounded-[.375rem] w-full bg-[#f3f4f6] text-[#111827] px-4 py-6 shadow-large--oblique hover-shadow-larg group-hover:shadow-large smooth border border-slate-300 dark:border-slate-800">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-row flex-center-y justify-between space-x-4 space-x-reverse">
                <div className="flex flex-col space-y-4 w-full">
                  <div className="font-bold text-xl pr-3">{name}</div>
                  <div className="w-full h-[2px] rounded-[.5rem] smooth bg-teal-400 dark:bg-teal-600" />
                  <div className="text-[#6b7280]">
                    <span>
                      جميع كورسات {name}
                      <br />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default YearCard;
