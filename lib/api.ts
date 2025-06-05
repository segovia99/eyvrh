"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { BACKEND_URL } from "@/config-global";
import { Employee } from "@/validations/employee";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${BACKEND_URL}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });

  const data = await response.json();

  const ordenado = data.sort((a:any, b:any) => b.id - a.id);


  return ordenado;
};

export const createUser = async (data: Employee) => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: JSON.stringify(data),
    });

    const dataJson = await response.json();

    revalidatePath('/empleados');

    return dataJson;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const session = await getServerSession(authOptions);
    await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    revalidatePath('/empleados');
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export const getuser = async (id: number) => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });

    const dataJson = await response.json();

    return dataJson;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};
