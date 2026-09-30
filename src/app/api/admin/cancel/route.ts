import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

// Protected by middleware (basic auth on /admin and /api/admin).
export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  if (id) await getStore().update(id, { status: "cancelled" });
  return NextResponse.redirect(new URL(`/admin?date=${form.get("date") ?? ""}`, req.url), 303);
}
