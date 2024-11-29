"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/actions/admin/user";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => await getStats(),
  });
  const { state } = useSidebar();
  const dashboardItems = [
    {
      title: "الكورسات",
      icon: BookOpen,
      description: "إدارة الكورسات ",
      count: isLoading ? 0 : data?.totalCourses,
      link: "/dashboard/courses",
    },
    {
      title: "المستخدمين",
      icon: Users,
      description: "إدارة الطلاب والمستخدمين",
      count: isLoading ? 0 : data?.totalUsers,
      link: "/dashboard/users",
    },
    {
      title: "الصفوف الدراسية",
      icon: Calendar,
      description: "إدارة السنوات الدراسية",
      count: isLoading ? 0 : data?.totalYears,
      link: "/dashboard/years",
    },
    {
      title: "الدروس",
      icon: GraduationCap,
      description: "إدارة الدروس والمحاضرات",
      count: isLoading ? 0 : data?.totalLessons,
      link: "/dashboard/lessons",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-right">لوحة التحكم</h1>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary size-10 animate-spin" />
        </div>
      ) : (
        <div
          className={`grid gap-6 md:${
            state === "collapsed" ? "grid-cols-2" : "grid-cols-1"
          } lg:grid-cols-2`}
        >
          {dashboardItems.map((item) => (
            <Card key={item.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Link href={item.link}>
                  <CardTitle className="text-xl font-bold hover:text-primary">
                    {item.title}
                  </CardTitle>
                </Link>
                <item.icon className="h-8 w-8 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2 text-primary">
                  {item.count}
                </div>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
                <div className="absolute bottom-4 left-4">
                  {/* <Button asChild>
                  <Link href={item.link}>عرض التفاصيل</Link>
                </Button> */}
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
