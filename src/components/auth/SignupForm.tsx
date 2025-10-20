"use client";

import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, signupAction, pending] = useActionState(signup, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signupAction}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  defaultValue={state?.name || ""}
                />
                {state?.errors?.name && (
                  <FieldError>{state.errors.name}</FieldError>
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  defaultValue={state?.email || ""}
                />
                {state?.errors?.email && (
                  <FieldError>{state.errors.email}</FieldError>
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password"></Input>
                {state?.errors?.password && (
                  <FieldError>
                    Password must:
                    <ul className="list-disc ps-4">
                      {state.errors.password.map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  </FieldError>
                )}
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                ></Input>
                {state?.errors?.confirmPassword && (
                  <FieldError>{state.errors.confirmPassword}</FieldError>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={pending}
                >
                  Signup
                </Button>
                {state?.message && <FieldError>{state.message}</FieldError>}
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
