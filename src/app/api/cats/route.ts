import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { catsTable } from "@/db/schema";

export async function GET(request: NextRequest) {
  // Get limit and skip from query params, with defaults
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);

  // Query with pagination
  const cats = await db
    .select()
    .from(catsTable)
    .limit(limit)
    .offset(skip);

  return NextResponse.json({ cats });
}