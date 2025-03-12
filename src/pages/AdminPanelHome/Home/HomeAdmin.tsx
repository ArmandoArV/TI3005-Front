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
import { IProviderDocumentsResponse } from "../../../Interfaces/IProviderInterfaces";
import { LoadingComponent } from "../../../Components/LoadingComponent/LoadingComponent";
import FilterComponent from "../../../Components/FilterComponent/FilterComponent";
import SearchComponent from "../../../Components/SearchComponent/SearchComponent";
import { IClientDocumentsResponse } from "../../../Interfaces/IClientInterfaces";
const extractFileId = (fileUrl: string): string | null => {
  const regex = /\/d\/([^\/]+)\/view/;
  const match = fileUrl.match(regex);
  return match ? match[1] : null;
};

const transformFileUrl = (fileUrl: string): string | null => {
  const fileId = extractFileId(fileUrl);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
};

export const transformData = (
  fetchedData: IClientDocumentsResponse
): IClientRow[] => {
  return fetchedData.clients.map((clientData) => {
    const { client, vendor, documents } = clientData;

    // Map documents to the IDocument structure
    const transformedDocuments: IDocument[] = documents.map((doc) => ({
      documentId: doc.id,
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

    console.log("client", client);
    return {
      clientName: client.name,
      managerName: vendor.name,
      status: client.documentsStatus as DocumentStatus,
      documents: transformedDocuments,
      fecha: latestTimestamp,
      id: client.id,
      ownerId: client.id.toString(),
      ownerType: "Client",
    };
  });
};

export const transformDataProviders = (
  fetchedProvidersResponse: IProviderDocumentsResponse
): IClientRow[] => {
  return fetchedProvidersResponse.providers.map((providerData) => {
    const { provider, vendor, documents } = providerData;

    // Map documents to the IDocument structure
    const transformedDocuments: IDocument[] = documents.map((doc) => ({
      documentId: doc.id,
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
      clientName: provider.name,
      managerName: vendor.name,
      status: provider.documentsStatus as DocumentStatus,
      documents: transformedDocuments,
      fecha: latestTimestamp,
      id: provider.id,
      ownerId: provider.id.toString(),
      ownerType: "Provider",
    };
  });
};

export const HomeAdmin = () => {
  const [dataCliente, setDataCliente] = useState<IClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataProveedor, setDataProveedor] = useState<IClientRow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter state
  const [filterType, setFilterType] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  const filterOptions = {
    fechas: Array.from(
      new Set([
        ...dataCliente.map((item) => item.fecha),
        ...dataProveedor.map((item) => item.fecha),
      ])
    ), // Get unique fechas
    encargados: Array.from(
      new Set([
        ...dataCliente.map((item) => item.managerName),
        ...dataProveedor.map((item) => item.managerName),
      ])
    ), // Get unique encargados
    estatus: Array.from(
      new Set([
        ...dataCliente.map((item) => item.status),
        ...dataProveedor.map((item) => item.status),
      ])
    ), // Get unique estatus
  };

  const applyFilter = (data: IClientRow[]) => {
    let filteredData = data;

    if (filterType && filterValue) {
      filteredData = filteredData.filter((row) => {
        switch (filterType) {
          case "fecha":
            return row.fecha === filterValue;
          case "encargado":
            return row.managerName === filterValue;
          case "estatus":
            return row.status === filterValue;
          default:
            return true;
        }
      });
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (row) =>
          row.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.managerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  };

  // Filtered data based on selected filters
  const filteredClienteData = applyFilter(dataCliente);
  const filteredProveedorData = applyFilter(dataProveedor);

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
      const fetchedData: IClientDocumentsResponse = await response.json();

      if (fetchedData.success) {
        const transformedData = transformData(fetchedData);
        console.log("transformedData", transformedData);
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
    return <LoadingComponent />;
  }
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AuthRoute>
      <div className={styles["fullContainer"]}>
        <HeaderComponent />
        <div className={styles["contentContainer"]}>
          <div className={styles["lateralNavbarContainer"]}>
            <LateralNavbarComponent options={lateralNavbarElements} />
          </div>

          <div className={styles["mainContent"]}>
            <div className={styles["welcomeContainer"]}>
              <h2 className={styles["welcomeText"]}>Bienvenido</h2>
            </div>
            <div className={styles["filterContainer"]}>
              <div className={styles["leftFilterContainer"]}>
                <FilterComponent
                  onFilterChange={(type, value) => {
                    setFilterType(type);
                    setFilterValue(value);
                  }}
                  filterOptions={filterOptions}
                />
              </div>
              <div className={styles["rightFilterContainer"]}>
                <SearchComponent onSearch={handleSearch} />
              </div>
            </div>
            <div className={styles["topContainer"]}>
              <div className={styles[""]}>
                <PendingTable
                  data={filteredClienteData}
                  tableTitle="Documentos Pendientes del Cliente"
                  clientType="Cliente"
                />
              </div>
              <div className={styles[""]}>
                <PendingTable
                  data={filteredProveedorData}
                  tableTitle="Documentos Pendientes del Proveedor"
                  clientType="Proveedor"
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
