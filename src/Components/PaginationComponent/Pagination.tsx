import React from "react";
import next from "../../resources/next.png";
import previous from "../../resources/previous.png";
import styles from "./main.module.css";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={styles.paginationButton}
            >
                <img src={previous} alt="Previous" />
            </button>
            <span>{`${currentPage} de ${totalPages}`}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className={styles.paginationButton}
            >
                <img src={next} alt="Next" />
            </button>
        </div>
    );
});