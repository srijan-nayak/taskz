"use client";

import { ProjectPromiseContext } from "@/providers/ProjectPromiseProvider";
import { use, useContext } from "react";

export default function useProject() {
  const promise = useContext(ProjectPromiseContext);
  const result = use(promise);
  return result.ok ? result.data : null;
}
