"use client";
import { getSingleVideo, updateVideo } from "@/actions/admin/lesson";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  id: string;
  refetch: () => void;
};
const UpdateVideo = ({ id, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => await getSingleVideo(id),
  });

  const {
    data: res,
    isPending,
    isSuccess,
    mutate,
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
    }) => await updateVideo({ id, name, url, description }),
  });

  const handleUpdate = () => {
    mutate({
      name,
      url,
      description,
    });
  };

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      setName(data.name);
      setUrl(data.url);
      setDescription(data.description);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
      setOpen(false);
    }
  }, [isSuccess, res, refetch]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-right text-2xl font-bold">
                تعديل الفيديو
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
                <Button onClick={handleUpdate}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "تعديل الفيديو"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateVideo;
