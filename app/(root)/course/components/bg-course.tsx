/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { getSingleCourse } from "@/actions/user/courses";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Loader2, Recycle, SquarePlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const getCourse = () => {
  const params = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["course"],
    queryFn: async () => await getSingleCourse(params?.courseId as string),
  });

  return {
    isLoading,
    data,
  };
};

const BgCourse = () => {
  const { data, isLoading } = getCourse();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rounded-[.375rem] py-24 px-8 text-slate-100 relative overflow-hidden pb-56 bg-primary">
      {isLoading ? (
        <Loader2 className="w-10 h-10 animate-spin" />
      ) : (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap"></div>
          <div className="text-3xl font-bold">{data?.name}</div>
          <div className="">
            <span>{data?.description}</span>
          </div>
          <div className="flex flex-col sm:flex-row text-xs text-slate-100 sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse">
            <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
              <span className="flex-center-both trasnform text-secondary">
                <SquarePlus className="w-[1em] h-[1em]" />
              </span>
              <span className="font-bold underline">
                <span>تاريخ انشاء الكورس</span>{" "}
              </span>
              <span className="bg-secondary px-3 rounded-full opacity-90 text-slate-800">
                {format(data?.createdAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
            <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
              <span className="flex-center-both trasnform text-muted">
                <Recycle className="w-[1em] h-[1em]" />
              </span>
              <span className="font-w-bold underline">آخر تحديث للكورس</span>
              <span className="bg-muted px-3 rounded-full opacity-90 text-slate-800">
                {format(data?.updatedAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="w-auto h-full md:w-full opacity-20 relative mr-auto transform"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        ></div>
        <div className="absolute inset-0 w-full h-full bg-gradient text-primary"></div>
      </div>
    </div>
  );
};

export default BgCourse;
