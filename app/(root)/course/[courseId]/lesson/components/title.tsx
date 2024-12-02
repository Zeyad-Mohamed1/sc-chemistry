/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { getSingleLesson } from "@/actions/user/lesson";
import { userCourses } from "@/app/(root)/my-courses/components/my-courses";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Video } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const getLesson = () => {
  const params = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => await getSingleLesson(params?.lessonId as string),
  });

  return { isLoading, data };
};

const Title = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const { data, isLoading } = getLesson();
  const [video, setVideo] = useState<any>({});
  const searchParams = useSearchParams();
  const { isLoading: coursesLoading, data: courses } = userCourses();

  const videoId =
    searchParams.get("videoId") ||
    (data?.video && data?.video?.length > 0 ? data?.video[0].id : undefined);

  useEffect(() => {
    // Wait until data is loaded
    if (isLoading || coursesLoading) {
      return; // Exit if still loading
    }

    // Check if the user is authenticated
    if (user === null) {
      router.push("/sign-in");
      return; // Exit after redirecting
    }

    // Check if the course exists and if it's free
    const exists =
      Array.isArray(courses) &&
      courses.some((course: any) => course.id === data?.courseId);

    if (!exists && !data?.isFree) {
      router.push("/");
    }
  }, [courses, data, router, user, isLoading, coursesLoading]);

  useEffect(() => {
    // Check if data is still loading
    if (isLoading) {
      return; // Exit early if data is loading
    }

    // Proceed only if data is loaded
    const video = data?.video?.find((video: any) => video.id === videoId);

    setVideo(video);
  }, [videoId, data, isLoading]);

  return (
    <div className="flex-center-both py-5">
      <div className="font-bold rounded-full border-2 text-white overflow-hidden border-muted bg-muted">
        {isLoading ? (
          <Loader2 className="w-10 h-10 animate-spin" />
        ) : (
          <div className="relative">
            <div className="flex-center-both">
              <div className="flex-center-both">
                <div className="rounded-full bg-white flex-center-both smooth shadow-lg">
                  <div className="text-2xl p-3">
                    <span className="flex-center-both trasnform text-yellow-500 -translate-y-px">
                      <Video className="size-[1.2em] text-muted" />
                    </span>
                  </div>
                </div>
                <div className="flex-center-both flex-col h-full px-5">
                  <div className="text-lg">{video?.name || "محاضرة"}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Title;
