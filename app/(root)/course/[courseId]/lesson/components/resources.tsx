/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FileText, Film, Loader2 } from "lucide-react";
import { getLesson } from "./title";
import { usePathname, useRouter } from "next/navigation";

const Resources = () => {
  const pathName = usePathname();
  const router = useRouter();
  // const searchParams = useSearchParams();
  const { data, isLoading } = getLesson();

  // Function to set the videoId in the search parameters
  const setVideoId = (id: string) => {
    router.push(`${pathName}?videoId=${id}`);
  };

  if (data?.video?.length === 0 && data?.pdf?.length === 0) return;

  return (
    <ScrollArea className="h-[600px] w-[300px] bg-gray-300 rounded-[1rem] border text-right mx-auto">
      <div className="p-6 sm:p-8 space-y-3 h-full">
        <div className="bg-white py-5 px-2 rounded-[.5rem] h-full">
          {isLoading ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : data?.video?.length === 0 && data?.pdf?.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center ">
              <span className="text-muted">
                لم تتم اضافة ملفات بعد لهذا الكورس
              </span>
            </div>
          ) : (
            <>
              {data?.video?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => setVideoId(item.id)}
                  className={cn(
                    "relative",
                    "p-3 sm:p-4 rounded-[.5rem] cursor-pointer transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground"

                    // selectedContent.id === item.id
                    //   ? "bg-accent text-accent-foreground border-border shadow-sm"
                    //   : "hover:border-border/50"
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base">
                        {item.name}
                      </h3>
                    </div>
                    <div className={cn("p-2 rounded-md")}>
                      <Film
                        className={cn("h-4 w-4 sm:h-5 sm:w-5", "text-blue-500")}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {data?.pdf?.map((item: any) => (
                <div
                  // href={item.url}
                  // target="_blank"
                  key={item.id}
                  className={cn(
                    "relative",
                    "p-3 sm:p-4 rounded-[.5rem] cursor-pointer transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <a href={item.url} target="_blank">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-sm sm:text-base">
                          {item.name}
                        </h3>
                      </div>
                      <div className={cn("p-2 rounded-[.5rem]")}>
                        <FileText
                          className={cn("h-4 w-4 sm:h-5 sm:w-5", "text-muted")}
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Resources;
