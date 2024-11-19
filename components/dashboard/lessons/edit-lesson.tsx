"use client";
import { updateLesson } from "@/actions/admin/lesson";
import { getSingleLesson } from "@/actions/user/lesson";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditLesson = ({ id, refetch }: { id: string; refetch: () => void }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => await getSingleLesson(id),
  });

  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [imageUrl, setImageUrl] = useState<string>(data?.image || "");

  const {
    mutate,
    isSuccess,
    isPending,
    data: response,
  } = useMutation({
    mutationKey: ["lesson"],
    mutationFn: async () =>
      await updateLesson({
        id,
        name,
        description,
        image: imageUrl,
      }),
  });

  const handleSubmit = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
    }
  }, [isSuccess, response, refetch]);

  useEffect(() => {
    setName(data?.name || "");
    setDescription(data?.description || "");
    setImageUrl(data?.image || "");
  }, [data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] space-y-4">
        <DialogHeader>
          <DialogTitle>تعديل الدرس</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">اسم الكورس</Label>
              <Input
                id="name"
                placeholder="اسم الدرس"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                placeholder="وصف الدرس"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الصورة</Label>
              {imageUrl !== "" && (
                <Image
                  src={imageUrl || ""}
                  alt="image"
                  width={100}
                  height={100}
                />
              )}
              <UploadButton
                endpoint="uploadCourseImage"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setImageUrl(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
            </div>
          </>
        )}

        <DialogClose
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "حفظ"}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditLesson;
