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

  const pageTotal = data?.totalPages || 0;

  function changePage(isNext: boolean) {
    if (!isNext) {
      if (page != 1) setPage(page - 1);
    }
    if (isNext) {
      if (page != pageTotal) {
        setPage(page + 1);
      }
    }
  }

  function getPageNumbers(currentPage: number, totalPages: number) {
    if (totalPages < 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      //todo: A modifier pour plusieurs pages
      return [1, 2, 3, "...", totalPages];
    }
  }

  const pageNumbers = getPageNumbers(page, pageTotal);

  return (
    <>
      <div className="cardList">
        <CardList cats={data?.data} />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                changePage(false);
              }}
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === pageNum}
                  onClick={() => setPage(Number(pageNum))}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext href="#" onClick={() => changePage(true)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
