import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(({ currentPage, totalPages, onPageChange }) => {
    return (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="pagination-button"
            >
                Previous
            </button>
            <span>{`${currentPage} de ${totalPages}`}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
});