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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

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

  function getPagePath(newPage: number, newPageSize: number) {
    const params = new URLSearchParams(searchParams);
    const pageNum = newPage > 0 ? Math.min(totalPages, newPage) : 1;
    params.set("page", pageNum.toString());
    params.set("pageSize", newPageSize.toString());

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
    <div className="flex flex-row mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={getPagePath(page - 1, pageSize)}
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
                  href={getPagePath(Number(pageNum), pageSize)}
                  isActive={page === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={getPagePath(Number(page + 1), pageSize)}
              isActive={page !== totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="ml-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button asChild variant="outline">
              <div>
                {pageSize}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Show items</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={getPagePath(1, 8)}>8</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={getPagePath(1, 12)}>12</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={getPagePath(1, 24)}>24</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={getPagePath(1, 48)}>48</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
