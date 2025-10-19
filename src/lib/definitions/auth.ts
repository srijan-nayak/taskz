import { JWTPayload } from "jose";
import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .trim(),
    email: z.email({ message: "Email must be a vaild email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Contain at least one upper case letter" })
      .regex(/[a-z]/, { message: "Contain at least one lower case letter" })
      .regex(/[0-9]/, { message: "Contain at least one digit" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  name?: string;
  email?: string;
} | null;

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password can't be blank" }),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  email?: string;
} | null;

export type SessionPayload = JWTPayload & {
  userId: string;
  expiresAt: string;
};
