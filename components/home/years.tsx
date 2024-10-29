import Image from "next/image";
import YearCard from "../shared/year-card";

const Years = () => {
  return (
    <div className="w-full py-20 relative">
      <div className="w-full flex items-center justify-center flex-col gap-6">
        <h2 className="courses text-primary">الصفوف الدراسية</h2>
        <Image src={"/line.svg"} alt="line" width={400} height={10} />
      </div>
      <div className="px-2 lg:px-4 sm:px-10 space-y-10 py-8">
        <div className="g-teal-400 smooth mt-10 clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 flex flex-wrap justify-center items-center mx-auto gap-10 md:gap-8 lg:gap-6">
          <YearCard />
          <YearCard />
          <YearCard />
        </div>
      </div>
    </div>
  );
};

export default Years;
