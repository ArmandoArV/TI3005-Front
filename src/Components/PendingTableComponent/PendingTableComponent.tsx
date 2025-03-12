import React, { useState } from "react";
import { DocumentStatus } from "../../Interfaces/IDocument";
import { IClientRow } from "../../Interfaces/IClientRow";
import { IDocument } from "../../Interfaces/IDocument";
import { Pagination } from "../PaginationComponent/Pagination";
import styles from "./main.module.css";
import expandIcon from "../../resources/expand-icon.png"; // Image for collapsed state
import collapseIcon from "../../resources/collapse-icon.png"; // Image for expanded state
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { FileModal } from "../FileModalComponent/FileModalComponent";

interface PendingTableProps {
  data: IClientRow[];
  tableTitle: string;
  clientType?: string;
}

const ITEMS_PER_PAGE = 5;

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case "Por validar":
      return "🟠";
    case "Rechazado":
      return "🔴";
    case "Sin entrega":
      return "⚫";
    case "Aceptado":
      return "✅";
    default:
      return "❓";
  }
};

export const PendingTable: React.FC<PendingTableProps> = ({
  data,
  tableTitle,
  clientType,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState<{
    documentTitle: string;
    fileUrl: string;
    documentId: string;
    ownerId: string;
    ownerType: string;
  } | null>(null);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const openModal = (
    documentTitle: string,
    fileUrl: string,
    documentId: string,
    ownerId: string,
    ownerType: string
  ) => {
    setModalData({ documentTitle, fileUrl, documentId, ownerId, ownerType });
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className={styles["outer-container"]}>
      <table className={styles["pending-table"]}>
        <thead>
          <tr className={styles["table-title"]}>
            <th colSpan={6} style={{ textAlign: "center" }}>
              {tableTitle}
            </th>
          </tr>
          <tr className={styles["table-header"]}>
            <th>Estatus</th>
            <th>{clientType}</th>
            <th>Encargado</th>
            <th>Documentos</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row: IClientRow, index: number) => (
              <React.Fragment key={index}>
                <tr className={styles["table-row"]}>
                  <td>
                    {getStatusColor(row.status)} {row.status}
                  </td>
                  <td>{row.clientName}</td>
                  <td>{row.managerName}</td>
                  <td>{`${row.documents.length}/3`}</td>
                  <td>
                    {new Date(row.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td>
                    <button
                      onClick={() => toggleRow(index)}
                      aria-label={
                        expandedRow === index ? "Collapse row" : "Expand row"
                      }
                      className={styles["expand-button"]}
                    >
                      <img
                        src={expandedRow === index ? collapseIcon : expandIcon} // Switch images based on state
                        alt={expandedRow === index ? "Collapse" : "Expand"}
                        className={styles["expand-icon"]}
                      />
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan={6} className={styles["expanded-row"]}>
                      <div className={styles["expanded-row-content"]}>
                        {row.documents.map(
                          (document: IDocument, docIndex: number) => (
                            <div
                              key={docIndex}
                              className={styles["document-row"]}
                            >
                              <div>{document.title}</div>
                              <div>
                                Estatus: {getStatusColor(document.status)}{" "}
                                {document.status}
                              </div>
                              <div style={{ marginTop: "5px" }}>
                                <ButtonComponent
                                  text={`Ver ${document.fileType}`} // Corrected template literal
                                  onClick={() =>
                                    openModal(
                                      document.title,
                                      document.fileUrl || "",
                                      document.documentId.toString(),
                                      row.ownerId,
                                      row.ownerType
                                    )
                                  }
                                  className={styles.customButton}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No hay documentos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {paginatedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      {modalData && (
        <FileModal
          documentTitle={modalData.documentTitle}
          fileUrl={modalData.fileUrl}
          onClose={closeModal}
          documentId={modalData.documentId}
          ownerId={modalData.ownerId}
          ownerType={modalData.ownerType}
        />
      )}
    </div>
  );
};

export default React.memo(PendingTable);
