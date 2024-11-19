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
import { Course, Year } from "@/utils/types";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createLesson } from "@/actions/admin/lesson";
import { getCourses } from "@/actions/admin/course";

export default function AddLesson() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [year, setYear] = useState("");
  const [courseId, setCourseId] = useState("");

  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses", year],
    queryFn: async () => await getCourses(year),
  });

  const { mutate, data, isSuccess } = useMutation({
    mutationKey: ["add-course"],
    mutationFn: async ({
      courseId,
      name,
      description,
      imageUrl,
    }: {
      courseId: string;
      name: string;
      description: string;
      imageUrl: string;
    }) => {
      await createLesson({
        id: courseId,
        name,
        description,
        image: imageUrl,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to an API

    mutate({
      courseId,
      name,
      description,
      imageUrl,
    });
    // Reset form fields after submission
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم اضافة الدرس بنجاح",
        timer: 2000,
        showConfirmButton: false,
      });

      push("/dashboard/lessons");
      setName("");
      setDescription("");
      setImageUrl("");
    }
  }, [isSuccess, data, push]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">اضافة درس</CardTitle>
      </CardHeader>
      <div>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الدرس</Label>
            <Input
              id="name"
              placeholder="اسم الدرس"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              placeholder="وصف الدرس"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">الصورة</Label>
            {imageUrl !== "" ? (
              <Image src={imageUrl} alt="image" width={100} height={100} />
            ) : (
              <UploadButton
                endpoint="uploadLessonImage"
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
            <Label htmlFor="description">العام الدراسي</Label>
            {isLoadingYears ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <Select onValueChange={(value) => setYear(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف الدراسي" />
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
          {year !== "" && (
            <div className="space-y-2">
              <Label htmlFor="description">الكورس</Label>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <Select onValueChange={(value) => setCourseId(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="برجاء اختيار الكورس" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses === null
                      ? null
                      : courses?.map((course: Course) => (
                          <SelectItem key={course.id} value={course.id ?? ""}>
                            {course.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            disabled={isLoading || courseId === "" || year === ""}
            onClick={handleSubmit}
            className="w-full"
          >
            اضافة الدرس
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
