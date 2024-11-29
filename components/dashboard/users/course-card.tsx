import { removeCourseForUser } from "@/actions/admin/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface CourseCardProps {
  id: string;
  name: string;
  refetch: () => void;
}

export function CourseCard({ id, name, refetch }: CourseCardProps) {
  const { data, isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async () => await removeCourseForUser({ id }),
  });

  const handleDelete = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data?.message,
        timer: 1000,
        showConfirmButton: false,
      });
      refetch();
    }
  }, [isSuccess, data, refetch]);

  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between p-4">
        <span className="font-medium">{name}</span>
        <Button
          className="rounded-[6px]"
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "حذف"}
        </Button>
      </CardContent>
    </Card>
  );
}
