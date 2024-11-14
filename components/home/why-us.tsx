import Image from "next/image";

// const words = ["شرح", "تمارين", "مراجعات", "تجهيز للامتحان"];

const WhyUs = () => {
  return (
    <>
      <div className="w-full h-[750px] lg:h-[500px] bg-primary relative">
        <Image
          src={"/stars.png"}
          fill
          className="object-cover w-full h-full"
          alt="Mountains and forests with two cabins"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-around mx-auto py-10 md:flex-row flex-col">
          <div className="flex-1 flex items-center justify-center sm:w-full md:w-1/2">
            <Image
              src={"/why-us.png"}
              width={300}
              height={300}
              alt="why-us"
              className="h-auto sm:w-2/3 md:w-1/2 lg:max-w-[500px] "
            />
          </div>

          <div className="flex-1 flex flex-col gap-3 items-center justify-center w-full md:w-1/2">
            <button className="button__loader w-[80%] md:w-1/2 xl:w-1/2">
              <span className="button__text font-bold text-lg">شرح</span>
            </button>
            <button className="button__loader w-[80%] md:w-1/2 xl:w-1/2">
              <span className="button__text font-bold text-lg">تمارين</span>
            </button>
            <button className="button__loader w-[80%] md:w-1/2 xl:w-1/2">
              <span className="button__text font-bold text-lg">مراجعات</span>
            </button>
            <button className="button__loader w-[80%] md:w-1/2 xl:w-1/2">
              <span className="button__text font-bold text-lg">
                تجهيز للامتحان
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="wave_container border-transparent">
        <div className="wave wave-1 border-transparent"></div>
        <div className="wave wave-2 border-transparent"></div>
        <div className="wave wave-3 border-transparent"></div>
        <div className="wave wave-4 border-transparent"></div>
      </div>
    </>
  );
};

export default WhyUs;
