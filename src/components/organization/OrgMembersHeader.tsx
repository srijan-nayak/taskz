"use client";

import { Role } from "@/generated/prisma/enums";
import useOrganization from "@/hooks/useOrganization";
import InviteMember from "@/components/membership/InviteMember";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";

export default function OrgMembersHeader() {
  const org = useOrganization();
  return (
    <MainHeader>
      <PageTitle>Organization Members</PageTitle>
      {org?.userRole !== Role.MEMBER && <InviteMember />}
    </MainHeader>
  );
}
