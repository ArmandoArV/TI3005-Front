import React, { useCallback, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import styles from "./main.module.css";
import { ReasonModalComponent } from "../ReasonModalComponent/ReasonModalComponent";
import { API_URL } from "../../Constants";
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from "../../Util/AlertUtil";
interface IFileModalProps {
  documentTitle: string;
  fileUrl: string;
  onClose: () => void;
  documentId: string;
  ownerId: string;
  ownerType: string;
}

export const FileModal: React.FC<IFileModalProps> = ({
  documentTitle,
  fileUrl,
  onClose,
  documentId,
  ownerId,
  ownerType,
}) => {
  const [showReasonModal, setShowReasonModal] = useState(false);

  const handleApprove = useCallback(() => {
    showConfirmAlert(
      "Confirmar",
      "¿Está seguro de que desea aprobar este documento?",
      "Aprobar",
      () => {
        fetch(`${API_URL}/documents/validate`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
          body: JSON.stringify({
            id: documentId,
            ownerId: ownerId,
            ownerType: ownerType,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              console.log("Document approved successfully");
              showSuccessAlert("Éxito", "Documento aprobado exitosamente", onClose);
            } else {
              console.error("Failed to approve document", result.message);
              showErrorAlert("Error", "No se pudo aprobar el documento");
            }
          })
          .catch((error) => {
            console.error("An error occurred while approving the document", error);
          });
      },
      () => {
        console.log("Approval cancelled");
      }
    );
  }, [documentId, ownerId, ownerType, onClose]);

  const handleReject = () => {
    setShowReasonModal(true);
  };

  const handleCloseReasonModal = () => {
    setShowReasonModal(false);
  };

  const handleSendReason = useCallback(
    async (ownerId: string, id: string, ownerType: string, reason: string) => {
      console.log("Send Reason", { ownerId, id, ownerType, reason });
      const requestBody = {
        id: id,
        rejectedReason: reason,
        ownerId: ownerId,
        ownerType: ownerType,
      };
      try {
        const response = await fetch(`${API_URL}/documents/reject`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
          body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.success) {
          console.log("Document rejected successfully");
          showSuccessAlert(
            "Éxito",
            "Documento rechazado exitosamente",
            onClose
          );
        } else {
          console.error("Failed to reject document", result.message);
          showErrorAlert("Error", "No se pudo rechazar el documento");
        }
      } catch (error) {
        console.error("An error occurred while rejecting the document", error);
      }
    },
    []
  );

  console.log("FileUrl", fileUrl);

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["topContainer"]}>
          <div className={styles["close-container"]}>
            <ButtonComponent
              text={`X`}
              onClick={onClose}
              className={styles["close-button"]}
            />
          </div>
        </div>
        <div className={styles["mediumContainer"]}>
          <div className={styles["leftContainer"]}>
            <div className={styles["title-container"]}>
              <h2 className={styles["title"]}>{documentTitle}</h2>
            </div>
          </div>
          <div className={styles["rightContainer"]}>
            <div className={styles["leftButtonContainer"]}>
              <ButtonComponent
                text="Aprobar"
                onClick={handleApprove}
                className={styles.customButton}
              />
            </div>
            <div className={styles["rightButtonContainer"]}>
              <ButtonComponent
                text="Rechazar"
                onClick={handleReject}
                className={styles.cancelButton}
              />
            </div>
          </div>
        </div>
        <div className={styles["bottomContainer"]}>
          <iframe
            src={fileUrl}
            title={documentTitle}
            className={styles["file-iframe"]}
          />
        </div>
      </div>
      {showReasonModal && (
        <ReasonModalComponent
          show={showReasonModal}
          onClose={handleCloseReasonModal}
          onSend={handleSendReason}
          ownerId={ownerId}
          documentId={documentId}
          ownerType={ownerType}
        />
      )}
    </div>
  );
};