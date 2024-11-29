"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from "@/utils/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Loader2, Recycle, SquarePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { userCourses } from "@/app/(root)/my-courses/components/my-courses";
import { useMutation } from "@tanstack/react-query";
import { craetePayment } from "@/actions/user/payment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CourseCard = ({
  image,
  name,
  description,
  price,
  createdAt,
  updatedAt,
  id,
}: Course) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const { isLoading: coursesLoading, data: courses } = userCourses();

  const {
    mutate,
    isPending: isPaymentLoading,
    isSuccess: isPaymentSuccess,
    data,
  } = useMutation({
    mutationKey: ["payment"],
    mutationFn: async ({
      email,
      first_name,
      last_name,
      name,
      phone_number,
      course_id,
      amount,
    }: any) =>
      await craetePayment({
        email,
        first_name,
        last_name,
        name,
        phone_number,
        course_id,
        amount,
      }),
  });

  useEffect(() => {
    if (isPaymentSuccess) {
      router.push(data?.url);
    }
  }, [isPaymentSuccess, router, data]);

  const handlePayment = () => {
    if (user === null) {
      router.push("/sign-in");
    } else {
      mutate({
        amount: price.toString(),
        course_id: id || "",
        email: "zoz@gmail.com",
        first_name: user.firstName,
        last_name: user.lastName,
        name,
        phone_number: user.studentNumber,
      });
    }
  };

  // Check if the courses are loading
  const isLoading = coursesLoading;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exists =
    Array.isArray(courses) && courses.some((course: any) => course.id === id);

  // If still loading, show a loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-[90%] flex-col items-center border-none rounded-[10px] relative sh mb-4 h-fit">
        <div className="image">
          <Image
            src={image}
            alt="aaa"
            width={500}
            height={500}
            className="hover:scale-110 w-full h-full transition-all"
          />
        </div>
        <div className="about">
          <div className="mt-11 flex flex-col gap-3 w-fit">
            <h3 className="font-semibold text-2xl lg:text-3xl">{name}</h3>
            <p className="p">{description}</p>
          </div>
          <div className="price ">
            <span> جنيهاَ </span>
            <span className="ml-1">{price.toFixed(2)}</span>
          </div>
          <div className="dates mt-4">
            <div className="flex items-center">
              <SquarePlus className="size-5 text-blue-500" />
              <span className="ms-2">
                {" "}
                {format(createdAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <Recycle className="size-5 text-blue-600" />
              <span className="ms-2">
                {" "}
                {format(updatedAt || "", "eeee, dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>
          </div>
          <div
            className={`${exists ? "btns w-full" : "btns justify-between "}`}
          >
            {exists ? (
              <Link href={`/course/${id}`} className="flex-1">
                <Button className="w-full">الدخول للكورس</Button>
              </Link>
            ) : (
              <>
                <Link href={`/course/${id}`}>
                  <Button className="w-full rounded-full" variant={"outline"}>
                    الدخول للكورس
                  </Button>
                </Link>

                <Button onClick={handlePayment} className="rounded-full">
                  {isPaymentLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  ) : (
                    "اشترك الان"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
