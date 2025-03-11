import React, { useCallback, useEffect } from "react";
import styles from "./main.module.css";
import { PendingTable } from "../../../Components/PendingTableComponent/PendingTableComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";
import LateralNavbarComponent from "../../../Components/LateralNavbarComponent/LateralNavbarComponent";
import { lateralNavbarElements } from "../../../Constants";
import { API_URL } from "../../../Constants";
import AuthRoute from "../../../Components/AuthComponent/AuthComponent";

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
    const fetchDocuments = useCallback(() => {
        fetch(`${API_URL}/documents/pending`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching pending documents");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
        , []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    return (
        // Wrap the content in the AuthRoute component
        <AuthRoute>
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
        </AuthRoute>
    );
};