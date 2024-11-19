/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, Film, Loader2 } from "lucide-react";
import ReadMore from "./read-more";
import { getLesson } from "./title";
import { ar } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Details = () => {
  const [video, setVideo] = useState<any>({});
  const { data, isLoading } = getLesson(); // Assuming this is a hook that fetches data
  const searchParams = useSearchParams();

  const videoId =
    searchParams.get("videoId") ||
    (data?.video && data.video.length > 0 ? data.video[0].id : undefined);

  useEffect(() => {
    // Check if data is still loading
    if (isLoading) {
      return; // Exit early if data is loading
    }

    // Proceed only if data is loaded
    const video = data?.video?.find((video: any) => video.id === videoId);
    // if (!video) {
    //   return notFound(); // Handle the case where the video is not found
    // }
    setVideo(video);
  }, [videoId, data, isLoading]);

  if (!video) {
    return;
  }

  return (
    <>
      <div className="max-w-5xl w-full rounded-[.5rem] mx-auto p-4 sm:p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {isLoading ? (
          <Loader2 className="w-10 h-10 animate-spin" />
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold">{video?.name}</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
              <Badge>
                <Film className="h-3 w-3 mx-1" />
                فيديو
              </Badge>

              <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mx-1" />
                {format(video?.createdAt || Date.now(), "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <ReadMore text={video?.description} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Details;
