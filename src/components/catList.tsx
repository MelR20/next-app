"use client";

import CardList from "@/components/cardList";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListPagination from "./listPagination";

function getCats(page: number, pageSize: number) {
  return fetch(`/api/cats?page=${page}&pageSize=${pageSize}`).then((res) =>
    res.json()
  );
}

export default function CatList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const { data, isLoading } = useQuery({
    queryKey: ["cats", page, pageSize],
    queryFn: () => getCats(page, pageSize),
  });

  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className="cardList">
        <CardList cats={data?.data} />
      </div>
      <ListPagination page={page} pageSize={pageSize} totalPages={totalPages} />
    </>
  );
}
