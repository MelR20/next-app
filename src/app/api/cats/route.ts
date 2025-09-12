import { NextResponse, NextRequest } from "next/server";
import { db } from "@/index";
import { catsTable } from "@/db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { getTotalPages, getOffset, Paginated } from "@/types/Paginated";
import { Cat } from "@/types/Cat";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1");
  const skip = getOffset(page, pageSize);
  const color = searchParams.get("color");
  // const startDate = searchParams.get("startDate");
  // const endDate = searchParams.get("endDate");


  const filterConditions =[];
  if (color) filterConditions.push(eq(catsTable.color, color));
  // to fix with dates
  // if (startDate) filterConditions.push(gte(catsTable.createdAt, startDate));
  // if (endDate) filterConditions.push(lte(catsTable.createdAt, endDate));


  const queryFilterConditions = filterConditions.length > 0 ? and(...filterConditions): undefined;
  
  const total = queryFilterConditions
    ? (await db.select({ count: count() }).from(catsTable).where(queryFilterConditions))[0].count 
    : (await db.select({ count: count() }).from(catsTable))[0].count ;
  
  const totalPages = getTotalPages(total, pageSize);

  
  const cats = queryFilterConditions
    ? await db.select().from(catsTable).where(queryFilterConditions).limit(pageSize).offset(skip) 
    : await db.select().from(catsTable).limit(pageSize).offset(skip);

  return NextResponse.json<Paginated<Cat>>({ data: cats, total: total, page: page, limit: pageSize, totalPages: totalPages });
}
