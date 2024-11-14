/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getLesson } from "./title";
import { notFound, useSearchParams } from "next/navigation";

const Video = () => {
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
    if (!video) {
      return notFound(); // Handle the case where the video is not found
    }
    setVideo(video);
  }, [videoId, data, isLoading]);

  return (
    <div className="w-full h-[500px] max-w-5xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary relative">
      <iframe
        id="i1B9uPfny7f6hpByOb90a"
        name="i1B9uPfny7f6hpByOb90a"
        src="https://view.officeapps.live.com/op/embed.aspx?id=1B9uPfny7f6hpByOb90a"
        allow="autoplay; encrypted-media; picture-in-picture none"
        scrolling="no"
        allowFullScreen={true}
        seamless
        style={{
          width: "100%", // Full width of the parent div
          height: "100%", // Full height of the parent div
          border: "none", // Remove default border
          position: "absolute", // Absolute positioning to fill the parent div
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          display: "block",
        }}
      ></iframe>
    </div>
  );
};

export default Video;
