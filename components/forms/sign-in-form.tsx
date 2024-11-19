"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Loader2, LockKeyhole, PhoneCall } from "lucide-react";

import { loginUser } from "@/actions/admin/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string({ message: "برجاء ادخال كلمة المرور" }).min(8, {
    message: "يجب الا يقل كلمة المرور عن 8 حروف",
  }),
  studentNumber: z
    .string({ message: "برجاء ادخال رقم هاتف صحيح" })
    .length(11)
    .regex(/^(010|011|012|015)/, {
      message: "برجاء ادخال رقم هاتف صحيح",
    }),
});

const SignInForm = () => {
  const { formState } = useForm();
  const { push, refresh } = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentNumber: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await loginUser(values);

    if (res.statusCode == 400 || res.statusCode == 404) {
      Swal.fire({
        icon: "error",
        title: res.message,
      });
    } else {
      refresh();
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.message,
        timer: 10000,
        preConfirm: () => {
          push("/");
        },
      });
      push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md mx-auto bg-white p-5 rounded-xl border border-gray-300"
      >
        <div className="py-4">
          <Image
            src={"/logo.png"}
            width={150}
            height={150}
            alt={"logo"}
            className="mx-auto"
            priority
          />
          <h1 className="text-2xl font-bold text-center mt-4">
            يلا نلم الكيمياء!
          </h1>
        </div>

        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label
                  htmlFor="studentNumber"
                  className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <input
                    type="text"
                    id="studentNumber"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                    placeholder=""
                    {...field}
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                    <PhoneCall className="h-4 w-4" />
                    رقم الطالب
                  </span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label
                  htmlFor="password"
                  className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                >
                  <input
                    type="password"
                    id="password"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                    placeholder=""
                    {...field}
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                    <LockKeyhole className="h-4 w-4" />
                    كلمة السر
                  </span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={formState.isSubmitting || !formState.isValid}
          type="submit"
          className="w-full rounded-[6px]"
        >
          {formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "تسجيل دخول"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
