'use server';

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { BACKEND_URL } from "@/config-global";
import { getServerSession } from "next-auth";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${BACKEND_URL}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.user?.token}`,
    },
  });

  const data = await response.json();

  return data;
};