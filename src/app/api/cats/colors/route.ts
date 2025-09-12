import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { catsTable } from "@/db/schema";
import { count } from "drizzle-orm";
import { Cat } from "@/types/Cat";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const catColors = await db
    .selectDistinct({color: catsTable.color})
    .from(catsTable)


  return NextResponse.json(catColors);
}
