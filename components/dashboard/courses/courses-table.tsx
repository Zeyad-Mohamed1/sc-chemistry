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
import {
  deleteCourse,
  getCourses,
  updateActivationForCourse,
} from "@/actions/admin/course";
import { Switch } from "@/components/ui/switch";
import EditCourse from "./edit-course";

export default function CoursesTable() {
  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const [yeardId, setYearId] = useState("");

  useEffect(() => {
    if (!isLoadingYears && years && years?.length > 0) {
      setYearId(years[0]?.id);
    }
  }, [isLoadingYears, years]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["courses", yeardId],
    queryFn: async () => await getCourses(yeardId),
    enabled: !!yeardId,
  });

  useEffect(() => {
    if (yeardId) {
      refetch();
    }
  }, [yeardId, refetch]);

  const {
    mutate,
    isSuccess,
    data: deleteData,
  } = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (id: string) => await deleteCourse(id),
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
    mutationFn: async (id: string) => await updateActivationForCourse(id),
    onSuccess: () => {
      refetch();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteCourses = (id: string) => {
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-right">جدول الكورسات</h1>
      <div className="mb-4 flex gap-2 items-center">
        {isLoadingYears ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Select onValueChange={(value) => setYearId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفلترة حسب الصف الدراسي" />
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
      </div>
      <div className="overflow-x-auto w-full">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : data === null || data?.length === 0 || data?.statusCode === 404 ? (
          <div className="w-full h-screen flex items-center justify-center">
            لا يوجد كورسات متوفرة لهذا الصف
          </div>
        ) : (
          <Table dir="rtl" className="border rounded-[12px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[1%]">#</TableHead>
                {["name", "description", "price"].map((column) => (
                  <TableHead key={column} className="text-right cursor-pointer">
                    {column === "name" && "الاسم"}
                    {column === "description" && "الوصف"}
                    {column === "price" && "السعر"}
                  </TableHead>
                ))}
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(data) &&
                data?.map((course: Course, i: number) => (
                  <TableRow key={course.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.description.slice(0, 100)}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={() => updateActive(course.id || "")}
                        defaultChecked={course.isActive}
                      />
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <EditCourse refetch={refetch} id={course.id ?? ""} />
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
                              هل أنت متأكد من حذف {course.name}؟
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
                                deleteCourses(course.id ?? "");
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
