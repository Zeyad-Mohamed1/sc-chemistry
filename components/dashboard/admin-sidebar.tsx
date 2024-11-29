"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Book,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  PackageOpen,
  Plus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const items = [
  { title: "المستخدمين", icon: Users, url: "/dashboard/users" },
  {
    title: "الصفوف الدراسية",
    icon: Calendar,
    url: "/dashboard/years",
    add: "سنة",
  },
  { title: "الكورسات", icon: Book, url: "/dashboard/courses", add: "كورس" },
  {
    title: "الدروس",
    icon: GraduationCap,
    url: "/dashboard/lessons",
    add: "درس",
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon" side="right" className="mt-20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 flex-col py-6"
            >
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="logo"
                className="object-cover"
              />
              <p
                className={cn(
                  "text-2xl font-semibold mt-5",
                  state === "collapsed" && "hidden"
                )}
              >
                لوحة التحكم
              </p>
            </Link>
          </SidebarHeader>
          <SidebarGroupLabel>الأقسام</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title === "المستخدمين" ? (
                    <SidebarMenuButton className="mt-4 text-lg w-full">
                      <Link href={item.url} className="flex items-center">
                        <item.icon className="h-6 w-6 ml-2" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="mt-4 text-lg w-full justify-between">
                          <div className="flex items-center">
                            <item.icon className="h-6 w-6 ml-2" />
                            {item.title}
                          </div>
                          {openItems.includes(item.title) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="py-2">
                          <SidebarMenuSubItem>
                            <Link
                              href={item.url}
                              className="flex items-center py-2 pl-8"
                            >
                              <PackageOpen className="h-4 w-4 ml-2" />
                              عرض الكل
                            </Link>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <Link
                              href={`${item.url}/add`}
                              className="flex items-center py-2 pl-3 w-full"
                            >
                              <Plus className="h-4 w-4 ml-2" />
                              إضافة {item.add}
                            </Link>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
