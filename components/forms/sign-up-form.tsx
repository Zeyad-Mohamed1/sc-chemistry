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
import { Loader2, LockKeyhole, PhoneCall, UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { governorates, years } from "@/utils/constants";
import { registerUser } from "@/actions/admin/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const formSchema = z
  .object({
    firstName: z
      .string({ message: "برجاء ادخال الاسم الاول" })
      .min(2, { message: "يجب الا يقل عدد الاحرف عن حرفين" }),
    lastName: z
      .string({ message: "برجاء ادخال الاسم الاخير" })
      .min(2, { message: "يجب الا يقل عدد الاحرف عن حرفين" }),
    password: z
      .string({ message: "برجاء ادخال كلمة المرور" })
      .min(8, { message: "يجب الا يقل كلمة المرور عن 8 حروف" }),
    confirmPassword: z.string({ message: "برجاء تأكيد كلمة المرور" }).min(8, {
      message: "يجب الا يقل كلمة المرور عن 8 حروف",
    }),
    studentNumber: z
      .string({ message: "برجاء ادخال رقم هاتف صحيح" })
      .length(11, { message: "برجاء ادخال رقم هاتف صحيح" })
      .regex(/^(010|011|012|015)/, {
        message: "برجاء ادخال رقم هاتف صحيح",
      }),
    parentNumber: z
      .string({ message: "برجاء ادخال رقم هاتف صحيح" })
      .length(11, { message: "برجاء ادخال رقم هاتف صحيح" })
      .regex(/^(010|011|012|015)/, {
        message: "برجاء ادخال رقم هاتف صحيح",
      }),
    governorate: z.string({
      message: "برجاء اختيار المحافظة",
    }),
    yearOfStudy: z.string({
      message: "برجاء اختيار السنة الدراسية",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });
const SignUpForm = () => {
  const [checked, setChecked] = useState(false);
  const { formState } = useForm();
  const { push } = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentNumber: "",
      parentNumber: "",
      governorate: governorates[16],
      yearOfStudy: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values;

    const res = await registerUser(rest);

    if ("error" in res) {
      return;
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: res.message,
      timer: 10000,
      preConfirm: () => {
        push("/sign-in");
      },
    });
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="Username"
                    className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                  >
                    <input
                      type="text"
                      id="firstName"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                      {...field}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                      <UserRound size={16} />
                      الاسم الاول
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="lastName"
                    className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                  >
                    <input
                      type="text"
                      id="lastName"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                      {...field}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                      <UserRound size={16} />
                      الاسم الاخير
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="parentNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="parentNumber"
                    className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                  >
                    <input
                      type="text"
                      id="parentNumber"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                      {...field}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                      <PhoneCall className="h-4 w-4" />
                      رقم ولي الامر
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="governorate"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={governorates[16]} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {governorates.map((governorate) => (
                    <SelectItem key={governorate} value={governorate}>
                      {governorate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر السنة الدراسية" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="confirmPassword"
                    className="relative block rounded-[6px] border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
                  >
                    <input
                      type="password"
                      id="confirmPassword"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-2 rounded-md"
                      placeholder=""
                      {...field}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs flex items-center gap-1">
                      <LockKeyhole className="h-4 w-4" />
                      تأكيد كلمة السر
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            required
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            أوافق علي{" "}
            <Link
              href="terms-and-conditions"
              className="text-primary underline"
            >
              سياسة الخصوصية و الشروط والأحكام .
            </Link>
          </label>
        </div>

        <Button
          disabled={formState.isSubmitting || !formState.isValid || !checked}
          type="submit"
          className="w-full rounded-[6px]"
        >
          {formState.isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "انشاء حساب"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
