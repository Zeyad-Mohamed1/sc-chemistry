"use client";
import { Loader2 } from "lucide-react";
import { getCourse } from "./bg-course";
import LessonCard from "./lesson-card";
import { Lesson } from "@/utils/types";

const LessonSection = () => {
  const { data, isLoading } = getCourse();

  return (
    <>
      <div className="py-10 px-5 sm:px-10">
        <div className="smooth font-bold text-2xl space-y-6">
          <div className="font-bold clr-text-primary py-5 text-4xl">
            <div className="relative">
              <span className="absolute w-1 h-full bg-secondary-container rounded-md right-[-10px] -top-0 transform -translate-y-2 smooth"></span>
              <span className="text-primary">
                <span className=" smooth">محتوى </span>
                <span className="smooth">الكورس </span>
              </span>
              <span className="absolute w-28 h-1 bg-secondary-container rounded-md right-[-10px] top-[120%] smooth"></span>
              <span className="absolute w-14 h-1 bg-secondary-container rounded-md right-[-10px] top-[120%] transform translate-y-2 smooth"></span>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary size-10 animate-spin" />
        </div>
      ) : (
        <>
          {data?.lessons.length === 0 && (
            <div className="w-full h-full flex items-center justify-center py-20 border border-dashed border-gray-500">
              <span className="text-muted">
                لم تتم اضافة دروس بعد لهذا الكورس
              </span>
            </div>
          )}
          <div className="smooth bg-opacity-50 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
            {data?.lessons.map((lesson: Lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default LessonSection;
