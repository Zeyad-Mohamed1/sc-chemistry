import CourseSection from "@/components/shared/courses-section";
import Image from "next/image";

const Courses = async ({ params }: { params: { yearName: string } }) => {
  const { yearName } = await params;
  const name = decodeURIComponent(yearName);
  return (
    <div className="px-2 lg:px-4 sm:px-10  space-y-10 py-8">
      <div className="w-full flex items-center justify-center flex-col gap-4 lg:gap-6">
        <h2 className="text-primary font-semibold text-xl lg:text-5xl mb-0 lg:mb-2">
          جميع كورسات{" "}
          <span className="text-[#17C3B2] font-bold">&quot;{name}&quot;</span>
        </h2>
        <Image
          src={"/line.svg"}
          alt="line"
          width={400}
          height={10}
          className="max-md:w-[200px]"
        />
      </div>
      <CourseSection name={name} />
    </div>
  );
};

export default Courses;
