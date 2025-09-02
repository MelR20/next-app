import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ListPagination({
  page,
  pageSize,
  totalPages,
}: {
  page: number;
  pageSize: number;
  totalPages: number;
}) {
  const pageNumbers = getPageNumbers(page, totalPages);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function getPagePath(newPage: number) {
    const params = new URLSearchParams(searchParams);
    const pageNum = newPage > 0 ? Math.min(totalPages, newPage) : 1;
    params.set("page", pageNum.toString());
    params.set("pageSize", pageSize.toString());

    return `${pathname}?${params.toString()}`;
  }

  function getPageNumbers(currentPage: number, totalPages: number) {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const pages = [];

      pages.push(1);

      if (currentPage <= 3) {
        pages.push(2, 3);
        if (totalPages > 4) {
          pages.push("...");
        }
      } else if (currentPage >= totalPages - 2) {
        if (totalPages > 4) {
          pages.push("...");
        }
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    }
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPagePath(page - 1)}
            isActive={page === 1}
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
                href={getPagePath(Number(pageNum))}
                isActive={page === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={getPagePath(Number(page + 1))}
            isActive={page !== totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
