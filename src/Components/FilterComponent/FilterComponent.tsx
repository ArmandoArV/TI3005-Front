import React, { useState } from "react";
import styles from "./FilterComponent.module.css";

interface FilterProps {
    onFilterChange: (filterType: string, filterValue: string) => void;
    filterOptions: {
        fechas: string[];
        encargados: string[];
        estatus: string[];
    };
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange, filterOptions }) => {
    const [selectedFecha, setSelectedFecha] = useState<string>("");
    const [selectedEncargado, setSelectedEncargado] = useState<string>("");
    const [selectedEstatus, setSelectedEstatus] = useState<string>("");

    const handleFilterChange = (type: string, value: string) => {
        onFilterChange(type, value);

        if (type === "fecha") setSelectedFecha(value);
        if (type === "encargado") setSelectedEncargado(value);
        if (type === "estatus") setSelectedEstatus(value);
    };

    return (
        <div className={styles["filter-container"]}>
            <svg
                className={styles["filter-icon"]}
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
                <polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4"></polygon>
            </svg>
            <select
                className={styles["filter-select"]}
                onChange={(e) => handleFilterChange("fecha", e.target.value)}
                value={selectedFecha}
            >
                <option value="">Filtrar por Fecha</option>
                {filterOptions.fechas.map((fecha, index) => (
                    <option key={index} value={fecha}>
                        {fecha}
                    </option>
                ))}
            </select>

            <select
                className={styles["filter-select"]}
                onChange={(e) => handleFilterChange("encargado", e.target.value)}
                value={selectedEncargado}
            >
                <option value="">Filtrar por Encargado</option>
                {filterOptions.encargados.map((encargado, index) => (
                    <option key={index} value={encargado}>
                        {encargado}
                    </option>
                ))}
            </select>

            <select
                className={styles["filter-select"]}
                onChange={(e) => handleFilterChange("estatus", e.target.value)}
                value={selectedEstatus}
            >
                <option value="">Filtrar por Estatus</option>
                {filterOptions.estatus.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterComponent;
