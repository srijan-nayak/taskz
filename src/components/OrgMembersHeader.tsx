"use client";

import { Role } from "@/generated/prisma/enums";
import useOrganization from "@/hooks/useOrganization";
import InviteMember from "@/components/InviteMember";
import MainHeader from "@/components/MainHeader";
import PageTitle from "@/components/PageTitle";

export default function OrgMembersHeader() {
  const org = useOrganization();
  return (
    <MainHeader>
      <PageTitle>Organization Members</PageTitle>
      {org?.userRole !== Role.MEMBER && <InviteMember />}
    </MainHeader>
  );
}
