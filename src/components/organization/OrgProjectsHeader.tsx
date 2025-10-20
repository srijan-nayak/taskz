"use client";

import useOrganization from "@/hooks/useOrganization";
import MainHeader from "@/components/common/MainHeader";
import PageTitle from "@/components/common/PageTitle";
import { Role } from "@/generated/prisma/enums";
import CreateProject from "@/components/project/CreateProject";

export default function OrgProjectsHeader() {
  const org = useOrganization();
  return (
    <MainHeader>
      <PageTitle>Organization Projects</PageTitle>
      {org?.userRole !== Role.MEMBER && <CreateProject />}
    </MainHeader>
  );
}
