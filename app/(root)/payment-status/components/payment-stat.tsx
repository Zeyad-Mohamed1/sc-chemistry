"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentStat = () => {
  const router = useRouter();
  const [count, setCount] = useState(5);
  const serachParams = useSearchParams();
  const success = serachParams.get("success");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (count === 0) {
    router.push("/");
  }

  return (
    <div className="grid h-screen place-content-center bg-gray-100 px-4">
      <div className="text-center">
        {success === "true" ? (
          <>
            <div className="flex items-center justify-center">
              <Image
                src="/success.png"
                alt="success"
                width={200}
                height={200}
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              تم الدفع بنجاح
            </h1>

            <Link
              href="/"
              className="inline-block bg-primary px-4 py-2 text-white rounded-[6px] mt-10"
            >
              الرجوع للصفحة الرئيسية
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Image src="/fail.png" alt="fail" width={200} height={200} />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              فشل في الدفع
            </h1>

            <p className="mt-4 text-gray-500">يرجي اعادة المحاولة</p>

            <Link
              href="/"
              className="inline-block bg-primary px-4 py-2 text-white rounded-[6px] mt-10"
            >
              الرجوع للصفحة الرئيسية
            </Link>
          </>
        )}

        <p className="mt-4 text-gray-500">
          سيتم اعادة توجيهك للصفحة الرئيسية في خلال{" "}
          <span className="font-bold text-primary">{count}</span> ثانية
        </p>
      </div>
    </div>
  );
};

export default PaymentStat;
