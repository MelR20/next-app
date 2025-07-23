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
import ReactQueryProvider from "../ReactQueryProvider";

export default async function Cats() {
  return (
    <main className="main-container">
      <h1 className="h1">All the Cuteness</h1>
      <div className="cardList">
        <ReactQueryProvider>
          <CardList page={1} pageSize={10} />
        </ReactQueryProvider>
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
    </main>
  );
}
