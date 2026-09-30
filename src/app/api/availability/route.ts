import { NextResponse } from "next/server";
import { availabilityFor } from "@/lib/availability";
import { bookableDates, isValidDate } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!isValidDate(date) || !bookableDates().includes(date)) {
    return NextResponse.json({ error: "Pick a date within the booking window." }, { status: 400 });
  }
  return NextResponse.json({ date, slots: await availabilityFor(date) });
}
