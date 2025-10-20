"use client";

import { login } from "@/actions/auth";
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

export default function LoginForm() {
  const [state, loginAction, pending] = useActionState(login, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with your email</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction}>
          <FieldSet>
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
                    <ul>
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
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={pending}
                >
                  Login
                </Button>
                {state?.message && <FieldError>{state.message}</FieldError>}
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
