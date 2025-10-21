"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { TaskFormState } from "@/lib/definitions/task";
import { Textarea } from "@/components/ui/textarea";

export default function TaskForm({
  state,
  action,
  pending,
}: {
  state: TaskFormState;
  action: (payload: FormData) => void;
  pending: boolean;
}) {
  const { projectId, orgId } = useParams<{
    projectId: string;
    orgId: string;
  }>();

  return (
    <form action={action}>
      <FieldSet>
        <FieldGroup>
          <Field hidden>
            <Input
              hidden
              name="org-id"
              type="text"
              defaultValue={orgId}
              readOnly
            />
          </Field>
          <Field hidden>
            <Input
              hidden
              name="project-id"
              type="text"
              defaultValue={projectId}
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Design UI"
              defaultValue={state?.title || ""}
            />
            {state?.errors?.title && (
              <FieldError>{state.errors.title}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Task details..."
              defaultValue={state?.description || ""}
            />
            {state?.errors?.description && (
              <FieldError>{state.errors.description}</FieldError>
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
              Create Project
            </Button>
            {state?.message && <FieldError>{state.message}</FieldError>}
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
