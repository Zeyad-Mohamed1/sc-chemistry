"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Course, Year } from "@/utils/types";
import { getYears } from "@/actions/admin/year";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getCourses } from "@/actions/admin/course";
import { Switch } from "@/components/ui/switch";
import EditLesson from "./edit-lesson";
import { getAllLessons } from "@/actions/user/lesson";
import { deleteLesson, updatePublishForLesson } from "@/actions/admin/lesson";
import Files from "./files";
import Videos from "./videos";

export default function LessonsTable() {
  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const [yeardId, setYearId] = useState("");
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    if (!isLoadingYears && years && years.length > 0) {
      setYearId(years[0]?.id);
    }
  }, [isLoadingYears, years]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["courses", yeardId],
    queryFn: async () => await getCourses(yeardId),
    enabled: !!yeardId,
  });

  const { isLoading: isLoadingLessons, data: lessons } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => await getAllLessons(courseId),
    enabled: !!courseId,
  });

  const {
    mutate,
    isSuccess,
    data: deleteData,
  } = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (id: string) => await deleteLesson(id),
    onSuccess: () => {
      refetch();
    },
  });

  const {
    mutate: updateActivateCourse,
    isSuccess: successActive,
    data: courseUpdated,
  } = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (id: string) => await updatePublishForLesson(id),
    onSuccess: () => {
      refetch();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteLessons = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: deleteData?.message,
        timer: 1000,
      });
    }
  }, [isSuccess, deleteData]);

  const updateActive = (id: string) => {
    updateActivateCourse(id);
  };

  useEffect(() => {
    if (successActive) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: courseUpdated?.message,
        timer: 1000,
      });
    }
  }, [successActive, courseUpdated]);

  if (isLoading || isLoadingLessons || isLoadingYears) {
    return <Loader2 className="w-6 h-6 animate-spin" />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-right">جدول الدروس</h1>
      <div className="mb-4 flex gap-2 items-center">
        {isLoadingYears ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Select onValueChange={(value) => setYearId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="برجاء اختيار السنة" />
            </SelectTrigger>
            <SelectContent>
              {years === null
                ? null
                : years?.map((year: Year) => (
                    <SelectItem key={year.id} value={year.id ?? "all"}>
                      {year.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        )}

        {courseId !== "" && isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <Select onValueChange={(value) => setCourseId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="برجاء اختيار الكورس" />
            </SelectTrigger>
            <SelectContent>
              {data?.statusCode === 404 ? (
                <div className="w-full flex items-center justify-center">
                  ...{data?.message}
                </div>
              ) : (
                data?.map((course: Course) => (
                  <SelectItem key={course.id} value={course.id ?? ""}>
                    {course.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="overflow-x-auto w-full">
        {yeardId === "" || courseId === "" ? (
          <div className="w-full h-screen flex items-center justify-center">
            برجاء تحديد السنة و الكورس
          </div>
        ) : isLoadingLessons ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : lessons.statusCode === 404 ? (
          <div className="w-full h-screen flex items-center justify-center">
            {lessons?.message}
          </div>
        ) : (
          <Table dir="rtl" className="border rounded-[12px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[1%]">#</TableHead>
                {["name", "description", "status"].map((column) => (
                  <TableHead key={column} className="text-right cursor-pointer">
                    {column === "name" && "الاسم"}
                    {column === "description" && "الوصف"}
                    {column === "status" && "الحالة"}
                  </TableHead>
                ))}
                <TableHead className="text-right">الملفات</TableHead>
                <TableHead className="text-right">الفيديوهات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(lessons) &&
                lessons?.map((lesson, i: number) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">{lesson.name}</TableCell>
                    <TableCell>{lesson.description.slice(0, 100)}</TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={() => updateActive(lesson.id || "")}
                        defaultChecked={lesson.isFree}
                      />
                    </TableCell>
                    <TableCell>
                      <Files id={lesson?.id ?? ""} />
                    </TableCell>

                    <TableCell>
                      <Videos id={lesson?.id ?? ""} />
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <EditLesson refetch={refetch} id={lesson.id ?? ""} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              هل أنت متأكد من حذف {lesson.name}؟
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المستخدم
                              نهائياً من النظام.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteLessons(lesson.id ?? "");
                              }}
                            >
                              تأكيد الحذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
