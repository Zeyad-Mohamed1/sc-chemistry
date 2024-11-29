/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard } from "./course-card";
import { Loader2, MonitorPlay } from "lucide-react";
import { Course, Year } from "@/utils/types";
import { getYears } from "@/actions/admin/year";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCourses } from "@/actions/admin/course";
import { addCourseForUser, getCoursesForUser } from "@/actions/admin/user";
import Swal from "sweetalert2";

export default function CourseManagementDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["courses", selectedYear],
    queryFn: async () => await getCourses(selectedYear as string),
    enabled: !!selectedYear,
  });

  const {
    data: userCourses,
    isLoading: isLoadingUserCourses,
    refetch: refetchUserCourses,
  } = useQuery({
    queryKey: ["user-courses", id],
    queryFn: async () => await getCoursesForUser(id),
  });

  const {
    mutate,
    isPending: isLoadingAdd,
    data: added,
    isSuccess,
  } = useMutation({
    mutationKey: ["add-courses"],
    mutationFn: async () =>
      await addCourseForUser({
        userId: id,
        courseId: selectedCourse as string,
      }),
  });

  const handleAddCourse = () => {
    if (selectedCourse) {
      mutate();
    }
  };

  useEffect(() => {
    if (!isLoadingYears && years && years.length > 0) {
      setSelectedYear(years[0]?.id);
    }
  }, [isLoadingYears, years]);

  useEffect(() => {
    if (selectedYear) {
      refetch();
    }
  }, [selectedYear, refetch]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: added?.message,
        timer: 2000,
        showConfirmButton: false,
      });
      refetchUserCourses();
    }
  }, [isSuccess, added, refetchUserCourses]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MonitorPlay className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>كورسات الطالب</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {isLoadingYears ? (
              <div className="col-span-4">
                <Loader2 className="text-primary size-5 animate-spin" />
              </div>
            ) : (
              <Select onValueChange={(value) => setSelectedYear(value)}>
                <SelectTrigger className="col-span-4">
                  <SelectValue placeholder="اختر السنة الدراسية" />
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
          <div className="grid grid-cols-4 items-center gap-4">
            {selectedCourse !== "" && isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <Select onValueChange={(value) => setSelectedCourse(value)}>
                <SelectTrigger className="col-span-3">
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
            <Button onClick={handleAddCourse} disabled={!selectedCourse}>
              {isLoadingAdd ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "إضافة"
              )}
            </Button>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">الكورسات المضافة :</h3>
          {userCourses?.length === 0 ||
          isLoadingUserCourses ||
          userCourses.statusCode === 404 ? (
            <div className="text-center text-primary">لا يوجد كورسات</div>
          ) : (
            userCourses?.map((course: any) => (
              <CourseCard
                key={course?.id}
                name={course?.course?.name}
                id={course.id}
                refetch={refetchUserCourses}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
