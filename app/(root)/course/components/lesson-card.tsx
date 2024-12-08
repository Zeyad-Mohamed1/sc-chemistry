"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Lesson } from "@/utils/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FolderSync, Loader2, SquarePlus } from "lucide-react";
import Image from "next/image";
import { userCourses } from "../../my-courses/components/my-courses";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const LessonCard = ({
  name,
  description,
  image,
  createdAt,
  updatedAt,
  id,
  isFree,
  courseId,
}: Lesson) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const { isLoading: coursesLoading, data: courses } = userCourses();

  // Check if the courses are loading
  const isLoading = coursesLoading;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exists =
    Array.isArray(courses) &&
    courses?.some((course: any) => course.id === courseId);

  // If still loading, show a loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  const handlePush = () => {
    if (user === null) {
      router.push("/sign-in");
    }
    router.push(`/course/${courseId}/lesson/${id}`);
  };

  return (
    <>
      <div className="flex flex-col w-[85%] items-center border-none rounded-[10px] relative sh mb-4 h-fit">
        <div className="image">
          <Image
            src={image}
            alt="aaa"
            width={500}
            height={500}
            className="hover:scale-110 w-full h-full transition-all"
          />
        </div>
        <div className="about w-fit pl-2">
          <div className="mt-5 flex flex-col gap-3 pl-2">
            <h3 className="font-semibold text-2xl lg:text-3xl">{name}</h3>
            <p className="p">{description}</p>
          </div>

          <div className="dates mt-4">
            <div className="flex items-center">
              <SquarePlus className="size-5 text-blue-500" />
              <span className="ms-2">
                {" "}
                {format(createdAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <FolderSync className="size-5 text-blue-600" />
              {/* <Recycle className="size-5 text-blue-600" /> */}
              <span className="ms-2">
                {" "}
                {format(updatedAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
          </div>
          <div className="mt-5">
            <Button
              onClick={handlePush}
              disabled={!exists && !isFree}
              className="w-full"
            >
              {exists || isFree ? "الدخول للمحاضرة" : "يجب شراء الكورس اولا"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonCard;
