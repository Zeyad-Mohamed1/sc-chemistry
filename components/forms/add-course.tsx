"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getYears } from "@/actions/admin/year";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Year } from "@/utils/types";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import { createCourse } from "@/actions/admin/course";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddCourse() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [year, setYear] = useState("");

  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const { mutate, data, isSuccess } = useMutation({
    mutationKey: ["add-course"],
    mutationFn: async ({
      id,
      name,
      description,
      price,
      imageUrl,
    }: {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }) => {
      await createCourse({
        id,
        name,
        description,
        price,
        image: imageUrl,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to an API

    mutate({
      id: year,
      name,
      description,
      price,
      imageUrl,
    });
    // Reset form fields after submission
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم اضافة الكورس بنجاح",
        timer: 2000,
        showConfirmButton: false,
      });

      push("/dashboard/courses");
      setName("");
      setDescription("");
      setPrice(0);
      setImageUrl("");
    }
  }, [isSuccess, data, push]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">اضافة كورس</CardTitle>
      </CardHeader>
      <div>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الكورس</Label>
            <Input
              id="name"
              placeholder="اسم الكورس"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              placeholder="وصف الكورس"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">العام الدراسي</Label>
            {isLoadingYears ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <Select onValueChange={(value) => setYear(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="الفلترة حسب الصف الدراسي" />
                </SelectTrigger>
                <SelectContent>
                  {years === null
                    ? null
                    : years?.map((year: Year) => (
                        <SelectItem key={year.id} value={year.id ?? ""}>
                          {year.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">الصورة</Label>
            {imageUrl !== "" ? (
              <Image src={imageUrl} alt="image" width={100} height={100} />
            ) : (
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
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
              step="1"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            اضافة الكورس
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
