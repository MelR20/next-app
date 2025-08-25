import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { catsTable } from "@/db/schema";
import { count } from "drizzle-orm";
import { getTotalPages, getOffset, Paginated } from "@/types/Paginated";
import { Cat } from "@/types/Cat";

export async function GET(request: NextRequest) {


  const { searchParams } = new URL(request.url);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1");
  const skip = getOffset(page, pageSize);
  
  const total = (await db.select({ count: count() }).from(catsTable))[0].count;
  const totalPages = getTotalPages(total, pageSize);

  
  const cats = await db
    .select()
    .from(catsTable)
    .limit(pageSize)
    .offset(skip);

  return NextResponse.json<Paginated<Cat>>({ data: cats, total: total, page: page, limit: pageSize, totalPages: totalPages });
}
