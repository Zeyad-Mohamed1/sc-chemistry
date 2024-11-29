"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/actions/admin/user";
import Swal from "sweetalert2";

export default function ChangePassword({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { mutate, data, isSuccess, isPending } = useMutation({
    mutationKey: ["pass"],
    mutationFn: async ({ id, password }: { id: string; password: string }) =>
      await changePassword({ id, password }),
  });

  const handleSubmit = () => {
    if (inputValue.length < 8)
      return Swal.fire({
        icon: "error",
        title: "يجب الا يقل كلمة المرور عن 8 حروف",
      });
    mutate({ id, password: inputValue });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data?.message,
        timer: 5000,
        showConfirmButton: false,
      });
      setOpen(false);
      setInputValue("");
    }
  }, [isSuccess, data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <KeyRound className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-4 py-4">
          <DialogTitle>تغيير كلمة المرور</DialogTitle>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="كلمة المرور"
            className="min-w-[200px]"
          />
          <Button className="w-[50%]" onClick={handleSubmit}>
            {isPending ? <Loader2 className="animate-spin" /> : "تغيير"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
