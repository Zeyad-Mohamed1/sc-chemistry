"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Trash2 } from "lucide-react";
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

import Paginations from "@/components/shared/pagination";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Year } from "@/utils/types";
import {
  deleteYear,
  getYears,
  updateActivationForYear,
} from "@/actions/admin/year";
import Swal from "sweetalert2";
import { useEffect } from "react";
import EditYear from "./edit-year";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function YearsTable() {
  // Get All Years
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  //  Change active
  const {
    mutate: activeMutate,
    data: activateMessage,
    isSuccess: activeSuccess,
  } = useMutation({
    mutationKey: ["years"],
    mutationFn: async (id: string) => await updateActivationForYear(id),
    onSuccess: () => {
      refetch();
    },
  });

  const updateActive = (id: string) => {
    activeMutate(id);
  };

  useEffect(() => {
    if (activeSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: activateMessage?.message,
        timer: 3000,
      });
    }
  }, [activeSuccess, activateMessage]);

  const {
    mutate,
    isSuccess,
    data: message,
  } = useMutation({
    mutationKey: ["years"],
    mutationFn: async (id: string) => await deleteYear(id),
    onSuccess: () => {
      refetch();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteYears = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message?.message,
        timer: 3000,
      });
    }
  }, [isSuccess, message]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6 text-right">
          جدول السنين الدراسية
        </h1>
        <Link href="/dashboard/years/add">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus />
            <span>اضافة سنة جديدة</span>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto w-full">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : data === null || data === undefined ? (
          <div className="w-full h-screen flex items-center justify-center">
            لم يتم اضافة سنوات دراسية بعد
          </div>
        ) : (
          <Table dir="rtl" className="border rounded-[12px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[1%]">#</TableHead>
                {["fullName", "parentNumber", "governorate"].map((column) => (
                  <TableHead key={column} className="text-right cursor-pointer">
                    {column === "fullName" && "العام الدراسي"}
                    {column === "parentNumber" && "الحالة"}
                    {column === "governorate" && "الاجراءات"}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) &&
                data?.map((year: Year, i: number) => (
                  <TableRow key={year.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">{year.name}</TableCell>
                    <TableCell>
                      <Switch
                        onCheckedChange={() => updateActive(year.id || "")}
                        defaultChecked={year.isActive}
                      />
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <EditYear id={year.id || ""} />
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
                              هل أنت متأكد من حذف {year.name}؟
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
                                deleteYears(year.id || "");
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
      <div className="text-center my-8">
        <Paginations totalPages={1} />
      </div>
    </div>
  );
}
