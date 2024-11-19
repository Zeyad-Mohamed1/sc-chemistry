import Image from "next/image";
import YearCard from "../shared/year-card";
import { getYearsForUser } from "@/actions/user/year";
import { Year } from "@/utils/types";

const Years = async () => {
  const years = await getYearsForUser();

  return (
    <div className="w-full py-20 relative">
      <div className="w-full flex items-center justify-center flex-col gap-6">
        <h2 className="courses font-semibold text-xl lg:text-5xl mb-0 lg:mb-2 text-primary">
          الصفوف الدراسية
        </h2>
        <Image src={"/line.svg"} alt="line" width={400} height={10} />
      </div>
      <div className="px-2 lg:px-4 sm:px-10 space-y-10 py-8">
        <div className="g-teal-400 smooth mt-10 clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 flex flex-wrap justify-center items-center mx-auto gap-10 md:gap-8 lg:gap-6">
          {years.length === 0 ? (
            <div className="w-full flex items-center justify-center">
              <h1 className="text-2xl font-bold text-primary">
                لا يوجد سنوات دراسية
              </h1>
            </div>
          ) : (
            years.map((year: Year) => (
              <YearCard key={year.id} name={year.name} image={year.image} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Years;
