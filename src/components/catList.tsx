"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardList from "@/components/cardList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function getCats(page: number, pageSize: number) {
  return fetch(`/api/cats?page=${page}&pageSize=${pageSize}`).then((res) =>
    res.json()
  );
}

export default function CatList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["cats", page, pageSize],
    queryFn: () => getCats(page, pageSize),
  });

  return (
    <>
      <div className="cardList">
        <CardList cats={data?.data} />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
