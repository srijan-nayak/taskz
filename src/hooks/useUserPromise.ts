import { UserPromiseContext } from "@/providers/UserPromiseProvider";
import { use, useContext } from "react";

export default function useUser() {
  const context = useContext(UserPromiseContext);
  const result = use(context);
  return result.ok ? result.data : null;
}
