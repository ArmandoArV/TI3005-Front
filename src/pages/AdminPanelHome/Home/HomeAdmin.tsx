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
import { FetchedProviders } from "../../../Interfaces/IFetchedProviders";
import {
  IProviderDashboardRow,
  IProviderDocumentsResponse,
} from "../../../Interfaces/IProviderInterfaces";

const extractFileId = (fileUrl: string): string | null => {
  const regex = /\/d\/([^\/]+)\/view/;
  const match = fileUrl.match(regex);
  return match ? match[1] : null;
};

const transformFileUrl = (fileUrl: string): string | null => {
  const fileId = extractFileId(fileUrl);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
};

const transformData = (fetchedData: FetchedData): IClientRow[] => {
  return fetchedData.clients.map((clientData) => {
    const { client, vendor, documents } = clientData;

    // Map documents to the IDocument structure
    const transformedDocuments: IDocument[] = documents.map((doc) => ({
      title: doc.documentType,
      status: doc.validStatus,
      fileUrl: doc.fileUrl ? transformFileUrl(doc.fileUrl) : null, // Transform the file URL
      fileType: doc.fileType,
    }));

    // Determine the latest timestamp for the "fecha" field
    const latestTimestamp = documents.reduce((latest, doc) => {
      const timestamp = doc.uploadTimestamp || doc.requestedTimestamp;
      return timestamp > latest ? timestamp : latest;
    }, "");

    return {
      clientName: client.name,
      managerName: vendor.name,
      status: client.documentsStatus,
      documents: transformedDocuments,
      fecha: latestTimestamp,
    };
  });
};

const transformDataProviders = (
  fetchedProvidersResponse: IProviderDocumentsResponse
): IClientRow[] => {
  return fetchedProvidersResponse.providers.map((providerData) => {
    const { provider, vendor, documents } = providerData;

    // Map documents to the IDocument structure
    const transformedDocuments: IDocument[] = documents.map((doc) => ({
      title: doc.documentType as string,
      status: doc.validStatus as DocumentStatus,
      fileUrl: doc.fileUrl ? transformFileUrl(doc.fileUrl) : null, // Transform the file URL
      fileType: doc.fileType as string,
    }));

    // Determine the latest timestamp for the "fecha" field
    const latestTimestamp = documents.reduce((latest, doc) => {
      const timestamp = doc.uploadTimestamp || doc.requestedTimestamp;
      return timestamp > latest ? timestamp : latest;
    }, "");

    // Return the transformed row with the correct fields
    return {
      clientName: provider.name, // Direct access to the `provider` data
      managerName: vendor.name, // Direct access to the `vendor` data
      status: provider.documentsStatus as DocumentStatus,
      documents: transformedDocuments,
      fecha: latestTimestamp,
    };
  });
};

export const HomeAdmin = () => {
  const [dataCliente, setDataCliente] = useState<IClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataProveedor, setDataProveedor] = useState<IClientRow[]>([]);

  // Memoize the fetchData function using useCallback
  const fetchClientData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/clientsPending`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const fetchedData: FetchedData = await response.json();

      if (fetchedData.success) {
        const transformedData = transformData(fetchedData);
        setDataCliente(transformedData);
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
      const response = await fetch(`${API_URL}/dashboard/providersPending`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const fetchedData: IProviderDocumentsResponse = await response.json();

      if (fetchedData.success) {
        const transformedData = transformDataProviders(fetchedData);
        console.log(transformedData);
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

  if (loading) {
    return <div>Loading...</div>;
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
            <h2>Dashboard</h2>
            <div className={styles["topContainer"]}>
              <div className={styles[""]}>
                <PendingTable
                  data={dataCliente}
                  tableTitle="Documentos Pendientes del Cliente"
                />
              </div>
              <div className={styles[""]}>
                <PendingTable
                  data={dataProveedor}
                  tableTitle="Documentos Pendientes del Proveedor"
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
