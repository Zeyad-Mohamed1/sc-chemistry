"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getYearsForUser } from "@/actions/user/year";
import { Loader2 } from "lucide-react";
import { Year } from "@/utils/types";

export function DropdownMenuYears() {
  const { data: years, isLoading } = useQuery({
    queryKey: ["years"],
    queryFn: async () => await getYearsForUser(),
  });
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        className="rounded-full flex items-center px-4 md:px-8 py-6 gap-3 text-primary font-medium text-lg bg-transparent hover:bg-transparent hover:text-primary"
      >
        السنوات الدراسية
        <Image
          src={"/years.png"}
          width={20}
          height={20}
          alt={"years"}
          className=""
        />
      </Button>

      {open && (
        <div
          className="absolute end-0 z-10 mt-2 w-fit divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            {isLoading ? (
              <Loader2 className="text-primary size-5 animate-spin" />
            ) : (
              years.map((year: Year) => (
                <Link
                  href={`/courses/${year.name}`}
                  key={year.id}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                >
                  {year.name}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
