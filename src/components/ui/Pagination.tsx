import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
  MoreIcon,
} from "@/components/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={cn("flex flex-row items-center gap-3", className)}>
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
          isFirstPage
            ? "bg-[#E5E7EB] text-[#CCD0D6] cursor-not-allowed"
            : "bg-[rgba(76,121,255,0.1)] text-[#4C79FF] hover:bg-[rgba(76,121,255,0.2)]"
        )}
      >
        <DoubleChevronLeftIcon className="w-6 h-6" />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
          isFirstPage
            ? "bg-[#E5E7EB] text-[#CCD0D6] cursor-not-allowed"
            : "bg-[rgba(76,121,255,0.1)] text-[#4C79FF] hover:bg-[rgba(76,121,255,0.2)]"
        )}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="w-6 h-6 rounded-md bg-[#F0F2F5] flex items-center justify-center"
            >
              <MoreIcon className="w-6 h-6 text-[#4B5563]" />
            </div>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "h-6 rounded-md flex items-center justify-center transition-colors",
              isActive
                ? "bg-[#4C79FF] text-white fontSize-body-b px-1 min-w-[24px]"
                : "bg-[#F0F2F5] text-[#4B5563] fontSize-body-m hover:bg-[#E5E7EB] w-6"
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
          isLastPage
            ? "bg-[#E5E7EB] text-[#CCD0D6] cursor-not-allowed"
            : "bg-[rgba(76,121,255,0.1)] text-[#4C79FF] hover:bg-[rgba(76,121,255,0.2)]"
        )}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
          isLastPage
            ? "bg-[#E5E7EB] text-[#CCD0D6] cursor-not-allowed"
            : "bg-[rgba(76,121,255,0.1)] text-[#4C79FF] hover:bg-[rgba(76,121,255,0.2)]"
        )}
      >
        <DoubleChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
