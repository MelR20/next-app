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
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function getCatColors() {
  return fetch(`/api/cats/colors`).then((res) => res.json());
}

export default function CatColorFilter({
  pageSize,
  totalPages,
}: {
  pageSize: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function getPagePath(newPage: number, newPageSize: number) {
    const params = new URLSearchParams(searchParams);
    const pageNum = newPage > 0 ? Math.min(totalPages, newPage) : 1;
    params.set("page", pageNum.toString());
    params.set("pageSize", newPageSize.toString());

    return `${pathname}?${params.toString()}`;
  }

  const { data: catColors, isLoading } = useQuery({
    queryKey: ["catColors"],
    queryFn: getCatColors,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button asChild variant="outline">
            <div>
              Filter by Color
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
          {catColors?.map((catColor: { color: string }, index: number) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={getPagePath(1, 10)}>{catColor.color}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
