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
import { Input } from "@/components/ui/input";
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
import Paginations from "@/components/shared/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "@/actions/admin/user";
import { User, Year } from "@/utils/types";
import { getYears } from "@/actions/admin/year";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function UsersTable() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";
  const year = searchParams.get("year") || "";

  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleYear = (year: string) => {
    const params = new URLSearchParams(searchParams);

    if (year === "all") {
      params.delete("year");
    } else if (year !== "all") {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["users", page, query, year],
    queryFn: async () => await getAllUsers({ page, query, year }),
  });

  const { isLoading: isLoadingYears, data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYears(),
  });

  const {
    mutate,
    isSuccess,
    data: deleteData,
  } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      refetch();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteUsers = (id: string) => {
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-right">جدول المستخدمين</h1>
      <div className="mb-4 flex gap-2 items-center">
        <Input
          type="text"
          placeholder="بحث..."
          defaultValue={searchParams.get("query")?.toString() || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        {isLoadingYears ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Select onValueChange={(value) => handleYear(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفلترة حسب الصف الدراسي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ازالة الفلترة</SelectItem>
              {years === null
                ? null
                : years?.map((year: Year) => (
                    <SelectItem key={year.id} value={year.name}>
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
        ) : data === null || data === undefined ? (
          <div className="w-full h-screen flex items-center justify-center">
            لا يوجد مستخدمين
          </div>
        ) : (
          <Table dir="rtl" className="border rounded-[12px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[1%]">#</TableHead>
                {[
                  "fullName",
                  "studentNumber",
                  "parentNumber",
                  "governorate",
                  "currentYear",
                ].map((column) => (
                  <TableHead key={column} className="text-right cursor-pointer">
                    {column === "fullName" && "الاسم الكامل"}
                    {column === "studentNumber" && "رقم الطالب"}
                    {column === "parentNumber" && "رقم ولي الأمر"}
                    {column === "governorate" && "المحافظة"}
                    {column === "currentYear" && "السنة الدراسية الحالية"}
                  </TableHead>
                ))}
                <TableHead className="text-right w-[1%] whitespace-nowrap">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.users?.map((user: User, i: number) => (
                <TableRow key={user.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.studentNumber}</TableCell>
                  <TableCell>{user.parentNumber}</TableCell>
                  <TableCell>{user.governorate}</TableCell>
                  <TableCell>{user.yearOfStudy}</TableCell>
                  <TableCell className="w-[1%] whitespace-nowrap">
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
                            هل أنت متأكد من حذف {user.firstName}؟
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
                              deleteUsers(user.id);
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
        <Paginations totalPages={data?.totalPages} />
      </div>
    </div>
  );
}
