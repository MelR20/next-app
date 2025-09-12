import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { catsTable } from "@/db/schema";

export async function GET(request: NextRequest) {

  const catColors = await db
    .selectDistinct({color: catsTable.color})
    .from(catsTable)


  return NextResponse.json(catColors);
}
