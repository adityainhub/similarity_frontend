
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Current page neighborhood
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pageNumbers.push("...");
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pageNumbers.push("...");
      } else {
        pageNumbers.push(i);
      }
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Remove duplicates
    return [...new Set(pageNumbers)];
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === "..." ? (
            <span className="px-2 text-gray-400">...</span>
          ) : (
            <Button
              variant={currentPage === pageNumber ? "default" : "outline"}
              className={
                currentPage === pageNumber
                  ? "bg-[#f59f00] hover:bg-[#e08e00] text-black"
                  : "bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a]"
              }
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          )}
        </React.Fragment>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-[#1e1e1e] border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
