import { isAdmin } from "@/lib/authorizatin";
import {
  InviteMemberFormState,
  InviteMemberFormSchema,
} from "@/lib/definitions/invitations";
import prisma from "@/lib/prisma";
import { verifySession, clearSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function inviteMember(
  _state: InviteMemberFormState,
  data: FormData | null
): Promise<InviteMemberFormState> {
  if (!data) {
    return { success: false };
  }

  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  const validatedFields = InviteMemberFormSchema.safeParse({
    email: data.get("email"),
    orgId: data.get("org-id"),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      email: data.get("email")?.toString(),
    };
  }
  const { email, orgId } = validatedFields.data;

  const isAuthorized = await isAdmin(session.userId, orgId);
  if (!isAuthorized) {
    await clearSession();
    redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      return {
        success: false,
        email,
        message: "No user exists for the given mail",
      };
    }

    await prisma.invitations.create({
      data: {
        userId: user.id,
        organizationId: orgId,
      },
    });
  } catch (err) {
    console.log("Failed to create invitation", err);
    return {
      success: false,
      message: "Failed to send invite! Please try again later",
      email,
    };
  }

  return { success: true };
}
