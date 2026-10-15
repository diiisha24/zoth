import { NextResponse } from "next/server";

import { getSaleSnapshot } from "@/lib/sale";

// The numbers depend on the current time, so never serve a cached copy.
export const dynamic = "force-dynamic";

export function GET() {
  try {
    return NextResponse.json(getSaleSnapshot(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[api/sale] failed to build snapshot", error);
    return NextResponse.json(
      { error: "Sale data is temporarily unavailable." },
      { status: 500 },
    );
  }
}
