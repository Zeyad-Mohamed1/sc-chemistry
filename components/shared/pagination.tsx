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
import { useSearchParams } from "next/navigation";

const Paginations = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  const pagesToDisplay = pageNumbers.slice(start - 1, end);

  const nextPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    return `?${params.toString()}`;
  };

  const prevPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page - 1).toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="w-full">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={prevPageUrl()} />
            </PaginationItem>
          )}
          {start > 1 && (
            <PaginationItem>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>
          )}
          {pagesToDisplay.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === page}
                href={
                  pageNumber === page
                    ? ""
                    : (() => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );
                        params.set("page", pageNumber.toString());
                        return `?${params.toString()}`;
                      })()
                }
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {end < totalPages && (
            <PaginationItem>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>
          )}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={nextPageUrl()} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
