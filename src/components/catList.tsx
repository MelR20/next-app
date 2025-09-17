"use client";

import CardList from "@/components/cardList";
import {
  usePrefetchQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListPagination from "./listPagination";
import { Button } from "./ui/button";
import CatColorFilter from "./catColorFilter";

function getCats(page: number, pageSize: number, color?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (color) {
    params.set("color", color);
  }

  return fetch(`/api/cats?${params.toString()}`).then((res) => res.json());
}

export default function CatList() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "8");
  const color = searchParams.get("color");

  function getPagePath(
    newPage: number,
    newPageSize: number,
    newColor?: string
  ) {
    const params = new URLSearchParams(searchParams);
    const pageNum = newPage > 0 ? Math.min(totalPages, newPage) : 1;
    params.set("page", pageNum.toString());
    params.set("pageSize", newPageSize.toString());

    if (newColor) {
      params.set("color", newColor);
    } else {
      params.delete("color");
    }

    return `${pathname}?${params.toString()}`;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["cats", page, pageSize, color],
    queryFn: () => getCats(page, pageSize, color || undefined),
  });

  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className="mb-4 ">
        <CatColorFilter
          pageSize={pageSize}
          totalPages={totalPages}
          getPagePath={getPagePath}
        />
      </div>
      <div className="cardList">
        <CardList cats={data?.data} />
      </div>
      <ListPagination page={page} pageSize={pageSize} totalPages={totalPages} />
    </>
  );
}
