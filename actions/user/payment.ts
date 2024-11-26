"use server";

import axios from "axios";

export const craetePayment = async ({
  amount,
  first_name,
  last_name,
  email,
  phone_number,
  name,
  course_id,
}: {
  amount: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  name: string;
  course_id: string;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/process?amount=${amount}&first_name=${first_name}&last_name=${last_name}&email=${email}&phone_number=${phone_number}&name=${name}&course_id=${course_id}`
  );

  return res.data;
};
