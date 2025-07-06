import { BILLING } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function Financials() {
  redirect(BILLING);
}
