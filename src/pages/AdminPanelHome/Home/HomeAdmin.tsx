import React from "react";
import styles from "./main.module.css";
import { PendingTable } from "../../../Components/PendingTableComponent/PendingTableComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";

// Mock data for the PendingTable
const data = [
    {
        status: "Por validar" as const, // Explicitly type as DocumentStatus
        clientName: "Nombre del cliente 1",
        managerName: "Nombre del encargado 1",
        fecha: "2023-10-15",
        documents: [
            { title: "Opinión de cumplimiento", status: "Por validar" as const, fileType: "PDF" },
            { title: "Constancia situación fiscal", status: "Por validar" as const, fileType: "PDF" },
            { title: "Contrato", status: "Por validar" as const, fileType: "PDF" },
        ],
    },
    {
        status: "Incompleto" as const, // Explicitly type as DocumentStatus
        clientName: "Nombre del cliente 2",
        managerName: "Nombre del encargado 2",
        fecha: "2023-10-16",
        documents: [
            { title: "Opinión de cumplimiento", status: "Por validar" as const, fileType: "PDF" },
            { title: "Contrato", status: "Por validar" as const, fileType: "PDF" },
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
        <main className={styles.background}>
            <HeaderComponent />
            <div className={styles.main}>
                <PendingTable data={data} tableTitle="Documentos Pendientes" />
            </div>
        </main>
    );
};