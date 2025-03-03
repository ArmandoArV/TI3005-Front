import React from "react";
import styles from "./main.module.css";
import { PendingTable } from "../../../Components/PendingTableComponent/PendingTableComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";
import LateralNavbarComponent from "../../../Components/LateralNavbarComponent/LateralNavbarComponent";
import { lateralNavbarElements } from "../../../Constants";

// Mock data for the PendingTable
const data = [
    {
        status: "Por validar" as const, // Explicitly type as DocumentStatus
        clientName: "Nombre del cliente 1",
        managerName: "Nombre del encargado 1",
        fecha: "2023-10-15",
        documents: [
            { title: "Opinión de cumplimiento", status: "Por validar" as const, fileType: "PDF", fileUrl: "https://www.orimi.com/pdf-test.pdf" },
            { title: "Constancia situación fiscal", status: "Por validar" as const, fileType: "PDF", fileUrl: "https://www.orimi.com/pdf-test.pdf" },
            { title: "Contrato", status: "Por validar" as const, fileType: "PDF", fileUrl: "https://www.orimi.com/pdf-test.pdf" },
        ],
    },
    {
        status: "Incompleto" as const, // Explicitly type as DocumentStatus
        clientName: "Nombre del cliente 2",
        managerName: "Nombre del encargado 2",
        fecha: "2023-10-16",
        documents: [
            { title: "Opinión de cumplimiento", status: "Por validar" as const, fileType: "PDF", fileUrl: "https://www.orimi.com/pdf-test.pdf" },
            { title: "Contrato", status: "Por validar" as const, fileType: "PDF", fileUrl: "https://www.orimi.com/pdf-test.pdf" },
        ],
    },
    {
        status: "Sin entrega" as const, // Explicitly type as DocumentStatus
        clientName: "Nombre del cliente 3",
        managerName: "Nombre del encargado 3",
        fecha: "2023-10-17",
        documents: [],
    },
];

export const HomeAdmin = () => {
    return (
        <div className={styles["fullContainer"]}>
            <HeaderComponent />
            <div className={styles["contentContainer"]}>
                <div className={styles["lateralNavbarContainer"]}>
                    <LateralNavbarComponent options={lateralNavbarElements} />
                </div>
                <div className={styles["mainContent"]}>
                    <h2>Dashboard</h2>
                    <PendingTable data={data} tableTitle="Documentos Pendientes" />
                </div>
            </div>
        </div>
    );
};