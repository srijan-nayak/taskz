"use client";

import { Result } from "@/lib/definitions/generic";
import { ProjectDetails } from "@/lib/definitions/project";
import { createContext, ReactNode } from "react";

export const ProjectPromiseContext = createContext<
  Promise<Result<ProjectDetails, string>>
>(new Promise((res) => res({ ok: false, err: "" })));

export default function ProjectPromiseProvider({
  promise,
  children,
}: {
  promise: Promise<Result<ProjectDetails, string>>;
  children: ReactNode;
}) {
  return (
    <ProjectPromiseContext.Provider value={promise}>
      {children}
    </ProjectPromiseContext.Provider>
  );
}
