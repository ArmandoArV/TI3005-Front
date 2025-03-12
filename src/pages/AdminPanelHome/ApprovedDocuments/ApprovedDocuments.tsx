import React, { useCallback, useState, useEffect } from "react";
import styles from "./main.module.css";
import { PendingTable } from "../../../Components/PendingTableComponent/PendingTableComponent";
import { HeaderComponent } from "../../../Components/HeaderComponent/HeaderComponent";
import LateralNavbarComponent from "../../../Components/LateralNavbarComponent/LateralNavbarComponent";
import { lateralNavbarElements } from "../../../Constants";
import { API_URL } from "../../../Constants";
import AuthRoute from "../../../Components/AuthComponent/AuthComponent";
import { FetchedData } from "../../../Interfaces/IFetchedDataDocuments";
import { IClientRow } from "../../../Interfaces/IClientRow";
import { DocumentStatus, IDocument } from "../../../Interfaces/IDocument";
import { LoadingComponent } from "../../../Components/LoadingComponent/LoadingComponent";
import { IClientDocumentsResponse } from "../../../Interfaces/IClientInterfaces";
import { IProviderDocumentsResponse } from "../../../Interfaces/IProviderInterfaces";
import { transformData, transformDataProviders } from "../Home/HomeAdmin";


export const ApprovedDocuments = () => {
  const [dataCliente, setDataCliente] = useState<IClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataProveedor, setDataProveedor] = useState<IClientRow[]>([]);

  // Memoize the fetchData function using useCallback
  const fetchClientData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/clientsValid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const fetchedData: IClientDocumentsResponse = await response.json();

      if (fetchedData.success) {
        const transformedData = transformData(fetchedData);
        setDataCliente(transformedData);
        console.log("Transformed data:", transformedData);
      } else {
        setError(fetchedData.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProviderData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/providersValid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const fetchedData: IProviderDocumentsResponse = await response.json();

      if (fetchedData.success) {
        const transformedData = transformDataProviders(fetchedData);
        setDataProveedor(transformedData);
      } else {
        setError(fetchedData.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientData();
    fetchProviderData();
  }, [fetchClientData, fetchProviderData]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await fetchClientData();
    await fetchProviderData();
    setLoading(false);
  }, [fetchClientData, fetchProviderData]);

  // Call this function when a document is approved or rejected
  const refreshData = () => {
    fetchData();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <AuthRoute>
      <div className={styles["fullContainer"]}>
        <HeaderComponent />
        <div className={styles["contentContainer"]}>
          <div className={styles["lateralNavbarContainer"]}>
            <LateralNavbarComponent options={lateralNavbarElements} />
          </div>
          <div className={styles["mainContent"]}>
            <h2>Documentos Aprobados</h2>
            <div className={styles["topContainer"]}>
              <div className={styles[""]}>
                <PendingTable
                  data={dataCliente}
                  tableTitle="Documentos Aprobados del Cliente"
                  clientType="Cliente"
                  onRefresh={refreshData}
                />
              </div>
              <div className={styles[""]}>
                <PendingTable
                  data={dataProveedor}
                  tableTitle="Documentos Aprobados del Proveedor"
                  clientType="Proveedor"
                  onRefresh={refreshData}
                />
              </div>
            </div>
            <div className={styles["bottomContainer"]}></div>
          </div>
        </div>
      </div>
    </AuthRoute>
  );
};
