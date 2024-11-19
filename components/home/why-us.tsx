"use client";
import Image from "next/image";

const words = ["شرح", "تمارين", "مراجعات", "تجهيز للإمتحان"];

const WhyUs = () => {
  return (
    <>
      <div className="w-full h-[850px] lg:h-[500px] bg-primary relative">
        <Image
          src={"/stars.png"}
          fill
          className="object-cover w-full h-full"
          alt="Mountains and forests with two cabins"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-around mx-auto py-4 md:flex-row flex-col max-w-7xl">
          <div className="flex-1 flex items-center justify-center sm:w-full md:w-1/2">
            <video
              src={"/about.mp4"}
              loop
              autoPlay
              muted
              width={400}
              height={300}
              className="object-contain max-sm:h-[30rem]"
              onError={(e) => {
                console.error("Error loading video:", e);
              }}
            ></video>
          </div>

          <div className="flex-1 flex flex-col gap-4 items-center justify-center w-full md:w-1/2">
            {words.map((word, index) => (
              <div
                key={index}
                className="custom-button flex items-center justify-center text-3xl relative w-[80%] md:w-[40%] py-4 bg-white/85 text-primary font-semibold border-none rounded-full outline-none"
              >
                {word}
              </div>
            ))}
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
