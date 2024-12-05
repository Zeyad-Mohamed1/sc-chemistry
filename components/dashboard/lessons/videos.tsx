/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addVideo, deleteVideo, getVideos } from "@/actions/admin/lesson";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UpdateVideo from "./update-video";

export default function Videos({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => await getVideos(id),
  });

  const {
    mutate: mutateUpload,
    isSuccess: uploadSuccess,
    data: video,
    isPending,
  } = useMutation({
    mutationKey: ["video"],
    mutationFn: async ({
      name,
      url,
      description,
    }: {
      name: string;
      url: string;
      description: string;
    }) =>
      await addVideo({
        id,
        name,
        url: `${url}`,
        description,
      }),
  });
  const upload = () => {
    mutateUpload({ name, url, description });
  };

  useEffect(() => {
    if (uploadSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: video?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
      setName("");
      setUrl("");
      setDescription("");
    }
  }, [uploadSuccess, refetch, video]);

  const {
    data: deleted,
    mutate,
    isSuccess,
    isPending: deleteLoading,
  } = useMutation({
    mutationKey: ["file"],
    mutationFn: async (id: string) => await deleteVideo(id),
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: deleted?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
    }
  }, [isSuccess, deleted, refetch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Video className="h-4 w-4" />
          الفيديوهات
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-right text-2xl font-bold">
                الفيديوهات ({data?.length || 0})
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 max-h-[300px] overflow-y-auto">
              <div className="my-4 flex flex-col gap-3 px-4">
                <Input
                  type="text"
                  placeholder="اسم الفيديو"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="رابط الفيديو"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Textarea
                  value={description}
                  placeholder="وصف الفيديو"
                  onChange={(e) => setDescription(e.target.value)}
                ></Textarea>
                <Button onClick={upload}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "اضافة الفيديو"
                  )}
                </Button>
              </div>
              {data?.statusCode === 404 || data?.length === 0 ? (
                <div className="flex items-center justify-center">
                  <p className="text-center text-lg font-medium">
                    لا يوجد فيديوهات
                  </p>
                </div>
              ) : (
                <>
                  {data?.map((video: any) => (
                    <div key={video?.id} className="px-4">
                      <Card className="mb-3 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-4">
                            <span className="text-lg font-medium">
                              {video?.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <UpdateVideo id={video?.id} refetch={refetch} />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(video?.id)}
                                className="text-red-500 hover:bg-red-100 hover:text-red-600"
                              >
                                {deleteLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">
                                      حذف {data?.name}
                                    </span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
