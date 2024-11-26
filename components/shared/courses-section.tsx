/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/actions/user/courses";
import { Course } from "@/utils/types";
import CourseCard from "./course-card";
import { useEffect } from "react";
import { notFound } from "next/navigation";

const CoursesSection = ({ name }: { name: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => await getCourses(name),
  });

  console.log(data);

  useEffect(() => {
    if (isLoading) {
      return () => {
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary size-10 animate-spin" />
        </div>;
      };
    }

    if (data?.statusCode === 400) {
      return notFound();
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary size-10 animate-spin" />
        </div>
      ) : data?.length === 0 || !data || data?.statusCode === 404 ? (
        <div className="w-full h-full flex items-center justify-center py-20 border border-dashed border-gray-500">
          <span className="text-muted">لم تتم اضافة كورسات بعد لهذه السنة</span>
        </div>
      ) : (
        <div className="smooth bg-opacity-50 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
          {Array.isArray(data) &&
            data?.map((course: Course) => (
              <CourseCard key={course.id} {...course} />
            ))}
        </div>
      )}
    </>
  );
};

export default CoursesSection;
