"use server";

import { SignupFormSchema, SignupFormState } from "@/lib/definitions/auth";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const SALT_ROUNDS = 10;
const PEPPER = process.env.PEPPER || "";

export async function signup(
  _state: SignupFormState,
  data: FormData
): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      name: data.get("name")?.toString(),
      email: data.get("email")?.toString(),
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return {
        errors: { email: ["Email already associated with existing account"] },
        name: data.get("name")?.toString(),
        email: data.get("email")?.toString(),
      };
    }

    const hashedPassword = await hash(password + PEPPER, SALT_ROUNDS);

    const insertedUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createSession(insertedUser.id);
  } catch (err) {
    console.error("Failed to signup user", err);
    return {
      message: "Signup failed! Please try again later",
    };
  }

  redirect("/app");
}
