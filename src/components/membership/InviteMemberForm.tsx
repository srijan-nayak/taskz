"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InviteMemberFormState } from "@/lib/definitions/invitations";

export default function InviteMemberForm({
  state,
  action,
  pending,
  orgId,
}: {
  state: InviteMemberFormState;
  action: (payload: FormData) => void;
  pending: boolean;
  orgId: string;
}) {
  return (
    <form action={action}>
      <FieldSet>
        <FieldGroup>
          <Field hidden>
            <Input hidden name="org-id" type="text" value={orgId} readOnly />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldDescription>
              Enter email address of an existing user
            </FieldDescription>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@org.com"
              defaultValue={state?.email || ""}
            />
            {state?.errors?.email && (
              <FieldError>{state.errors.email}</FieldError>
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
              Invite
            </Button>
            {state?.message && <FieldError>{state.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
