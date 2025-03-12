import React, { useState } from "react";
import styles from "./SearchComponent.module.css";

interface SearchProps {
    onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <div className={styles["search-container"]}>
            <svg
                className={styles["search-icon"]}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
                type="text"
                className={styles["search-input"]}
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchComponent;
