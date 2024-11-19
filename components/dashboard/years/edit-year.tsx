"use client";
import { getSingleYear, updateYear } from "@/actions/admin/year";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/utils/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditYear = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["year", id],
    queryFn: async () => await getSingleYear(id),
  });

  const [name, setName] = useState<string>(data?.name || "");
  const [image, setImage] = useState(data?.image || null);

  const {
    mutate,
    isSuccess,
    isPending,
    data: response,
  } = useMutation({
    mutationKey: ["years"],
    mutationFn: async () =>
      await updateYear(id, {
        name,
        image,
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
    }
  }, [isSuccess, response]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل العام الدراسي</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-4">
              <label
                htmlFor="className"
                className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
              >
                <input
                  type="text"
                  id="className"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                  placeholder="يرجى ادخال العام الدراسي"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                  العام الدراسي
                </span>
              </label>
            </div>
            <div className="mb-4">
              <div className="text-center mb-5">
                {image === null ? (
                  <Image
                    src={data?.image}
                    alt="image"
                    width={200}
                    height={200}
                  />
                ) : (
                  <Image src={image} alt="image" width={200} height={200} />
                )}
              </div>
              <UploadButton
                endpoint="uploadYearImage"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setImage(res[0]?.url);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
            </div>
          </div>
        )}

        <DialogClose>
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full" type="submit">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "حفظ"}
            </Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditYear;
