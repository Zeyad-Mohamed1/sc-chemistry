"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Calendar, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function DashboardPage() {
  const { state } = useSidebar();
  const dashboardItems = [
    {
      title: "الكورسات",
      icon: BookOpen,
      description: "إدارة الكورسات ",
      count: 24,
      link: "/dashboard/courses",
    },
    {
      title: "المستخدمين",
      icon: Users,
      description: "إدارة الطلاب والمستخدمين",
      count: 1234,
      link: "/dashboard/users",
    },
    {
      title: "الصفوف الدراسية",
      icon: Calendar,
      description: "إدارة السنوات الدراسية",
      count: 6,
      link: "/dashboard/years",
    },
    {
      title: "الدروس",
      icon: GraduationCap,
      description: "إدارة الدروس والمحاضرات",
      count: 156,
      link: "/dashboard/lessons",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-right">لوحة التحكم</h1>
      <div
        className={`grid gap-6 md:${
          state === "collapsed" ? "grid-cols-2" : "grid-cols-1"
        } lg:grid-cols-2`}
      >
        {dashboardItems.map((item) => (
          <Card key={item.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
              <item.icon className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">{item.count}</div>
              <CardDescription className="text-base">
                {item.description}
              </CardDescription>
              <div className="absolute bottom-4 left-4">
                <Button asChild>
                  <Link href={item.link}>عرض التفاصيل</Link>
                </Button>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
          </Card>
        ))}
      </div>
    </div>
  );
}
