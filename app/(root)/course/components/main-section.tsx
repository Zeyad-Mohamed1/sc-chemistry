/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { getCourse } from "./bg-course";
import { userCourses } from "../../my-courses/components/my-courses";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { craetePayment } from "@/actions/user/payment";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const { isLoading: courseLoading, data } = getCourse();
  const { isLoading: coursesLoading, data: courses } = userCourses();

  console.log(data);

  // Check if the courses are loading
  const isLoading = courseLoading || coursesLoading;

  const exists =
    Array.isArray(courses) &&
    courses.some((course: any) => course.id === data?.id);

  // If still loading, show a loader

  const {
    mutate,
    isPending: isPaymentLoading,
    isSuccess: isPaymentSuccess,
    data: dataPayment,
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
      router.push(dataPayment?.url);
    }
  }, [isPaymentSuccess, router, dataPayment]);

  const handlePayment = () => {
    if (user === null) {
      router.push("/sign-in");
    } else {
      mutate({
        amount: data?.price.toString(),
        course_id: data?.id || "",
        email: "zoz@gmail.com",
        first_name: user.firstName,
        last_name: user.lastName,
        name: data?.name,
        phone_number: user.studentNumber,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  // If data is not loading and course does not exist, render the main content
  return (
    <>
      {!exists && (
        <div className="px-2 lg:px-4 sm:px-10 relative py-0 space-y-10">
          <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
            <div className="md:basis-1/3 relative -mt-52">
              <div className="w-full glassy smooth text-[#111827] shadow-large rounded-[.5rem] overflow-hidden">
                <div className="p-4 space-y-8">
                  {courseLoading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-white" />
                  ) : (
                    <div className="overflow-hidden rounded-[.375rem]">
                      <Image
                        src={data?.image == null ? "/iphone.png" : data?.image}
                        alt="course"
                        width={500}
                        height={500}
                        className="w-full"
                      />
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    className="border-2 smooth false w-full inline-block text-center bg-secondary border-secondary hover:bg-opacity-0 dark:hover:bg-opacity-0 bg-opacity-100 hover:text-white/80 text-white rounded-[.375rem] px-4 py-2 "
                  >
                    {courseLoading ? (
                      <Loader2 className="w-10 h-10 animate-spin text-white" />
                    ) : (
                      <span className="">
                        {isPaymentLoading ? (
                          <Loader2 className="size-4 animate-spin text-white" />
                        ) : (
                          "اشتري الان"
                        )}
                      </span>
                    )}
                  </button>
                  <div className="text-slate-500 flex items-center gap-2 justify-center">
                    <span>السعر :</span>
                    <span>{data?.price} جنيه</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:basis-2/3">
              <div className="space-y-5">
                <div className="">
                  <div className="py-16 px-10 rounded-[.375rem] shadow-small border border-[#d1d5db] smooth clr-text-primary bg-[#fff] space-y-12">
                    {courseLoading ? (
                      <Loader2 className="w-10 h-10 animate-spin text-white" />
                    ) : (
                      <div className="space-y-8">
                        <div className="font-bold clr-text-primary text-2xl">
                          <div className="relative">
                            <span className="absolute w-1 h-full bg-secondary-container rounded-[.375rem] right-[-10px] -top-0 transform -translate-y-2 smooth"></span>
                            <span className="">
                              <span className="clr-text-primary smooth mb-2">
                                {data?.name}
                              </span>
                              <span className="text-sky-500 dark:text-sky-600 smooth">
                                {" "}
                              </span>
                            </span>
                            <span className="absolute w-14 h-1 bg-secondary-container rounded-[.375rem] right-[-10px] top-[120%] transform translate-y-2 smooth"></span>
                            <span className="absolute w-28 h-1 bg-secondary-container rounded-[.375rem] right-[-10px] top-[120%] smooth"></span>
                          </div>
                        </div>
                        <div className="clr-text-secondary">
                          <span>{data?.description}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainSection;
