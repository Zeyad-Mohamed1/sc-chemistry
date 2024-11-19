"use client";
import { UploadButton } from "@/utils/uploadthing";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { createYear } from "@/actions/admin/year";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const AddYear = () => {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const { mutate, isSuccess, isPending, data } = useMutation({
    mutationKey: ["years"],
    mutationFn: async () =>
      await createYear({
        name,
        image,
      }),
  });

  const handleSubmit = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess && data?.statusCode === 400) {
      Swal.fire({
        title: data?.message,

        icon: "error",
        confirmButtonText: "حسنا",
      });
    } else if (isSuccess && data?.statusCode !== 400) {
      Swal.fire({
        title: data?.message,

        icon: "success",
        confirmButtonText: "حسنا",
      });

      push("/dashboard/years");
    }
  }, [isSuccess, data, push]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">اضافة العام الجديد</h2>
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
            value={name}
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
            العام الدراسي
          </span>
        </label>
      </div>
      <div className="mb-4">
        {image !== "" ? (
          <div className="text-center">
            <Image src={image} alt="image" width={200} height={200} />
          </div>
        ) : (
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
        )}
      </div>
      <Button onClick={handleSubmit} className="w-full" type="submit">
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "اضافة العام الدراسي"
        )}
      </Button>
    </div>
  );
};

export default AddYear;
