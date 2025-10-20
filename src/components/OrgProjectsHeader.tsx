"use client";

import useOrganization from "@/hooks/useOrganization";
import MainHeader from "./MainHeader";
import PageTitle from "./PageTitle";
import { Role } from "@/generated/prisma/enums";
import CreateProject from "./CreateProject";

export default function OrgProjectsHeader() {
  const org = useOrganization();
  return (
    <MainHeader>
      <PageTitle>Organization Projects</PageTitle>
      {org?.userRole !== Role.MEMBER && <CreateProject />}
    </MainHeader>
  );
}
