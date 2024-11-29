/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { getUserCourses } from "@/actions/admin/user";
import CourseCard from "@/components/shared/course-card";
import { Course } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const userCourses = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["coursesofuser"],
    queryFn: async () => await getUserCourses(),
  });

  return {
    isLoading,
    data,
  };
};

const MyCourses = () => {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const { data, isLoading } = userCourses();

  useEffect(() => {
    if (data?.statusCode === 401 || user === null) {
      Swal.fire({
        icon: "error",
        title: user === null ? "برجاء تسجيل الدخول" : data?.message,
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/sign-in");
    }
  }, [data, router, user]);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary size-10 animate-spin" />
        </div>
      ) : (
        <>
          {!data || data?.length === 0 || data?.statusCode === 404 ? (
            <div className="text-muted text-center py-20 border border-dashed w-full border-gray-500">
              لا يوجد كورسات
            </div>
          ) : (
            <div className="smooth bg-opacity-50 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {Array.isArray(data) &&
                data?.map((course: Course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourses;
