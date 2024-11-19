/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { File, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPdf, deletePdf, getPdfs } from "@/actions/admin/lesson";
import { UploadButton } from "@/utils/uploadthing";
import Swal from "sweetalert2";

export default function Files({ id }: { id: string }) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["files"],
    queryFn: async () => await getPdfs(id),
  });

  const {
    mutate: mutateUpload,
    isSuccess: uploadSuccess,
    data: pdf,
  } = useMutation({
    mutationKey: ["file"],
    mutationFn: async ({ name, url }: { name: string; url: string }) =>
      await addPdf({ id, name, url }),
  });

  const upload = ({ name, url }: { name: string; url: string }) => {
    mutateUpload({ name, url });
  };

  useEffect(() => {
    if (uploadSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: pdf?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
    }
  }, [uploadSuccess, refetch, pdf]);

  const {
    data: deleted,
    mutate,
    isSuccess,
    isPending: deleteLoading,
  } = useMutation({
    mutationKey: ["file"],
    mutationFn: async (id: string) => await deletePdf(id),
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
          <File className="h-4 w-4" />
          الملفات
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-right text-2xl font-bold">
                قائمة الملفات ({data?.length || 0})
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 max-h-[300px] overflow-y-auto">
              {data?.statusCode === 404 || data?.length === 0 ? (
                <div className="flex items-center justify-center">
                  <p className="text-center text-lg font-medium">
                    لا يوجد ملفات
                  </p>
                </div>
              ) : (
                data?.map((pdf: any) => (
                  <div key={pdf?.id}>
                    <Card className="mb-3 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4">
                          <span className="text-lg font-medium">
                            {pdf?.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(pdf?.id)}
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
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>
            <DialogFooter className="w-full flex sm:justify-center">
              <UploadButton
                endpoint="uploadLessonPdfs"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  //   setName(res[0]?.name);
                  upload({
                    name: res[0]?.name,
                    url: res[0]?.url,
                  });
                  //   setUrl(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
