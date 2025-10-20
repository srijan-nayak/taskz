import { OrganizationPromiseContext } from "@/providers/OrganizationPromiseProvider";
import { use, useContext } from "react";

export default function useOrganization() {
  const promise = useContext(OrganizationPromiseContext);
  const result = use(promise);
  return result.ok ? result.data : null;
}
