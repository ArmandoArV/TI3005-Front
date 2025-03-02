import React, { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import styles from "./main.module.css";
import { ReasonModalComponent } from "../ReasonModalComponent/ReasonModalComponent";

interface IFileModalProps {
    documentTitle: string;
    fileUrl: string;
    onClose: () => void;
}

export const FileModal: React.FC<IFileModalProps> = ({ documentTitle, fileUrl, onClose }) => {
    const [showReasonModal, setShowReasonModal] = useState(false);

    const handleApprove = () => {
        console.log("Approve");
    }

    const handleReject = () => {
        setShowReasonModal(true);
    }

    const handleCloseReasonModal = () => {
        setShowReasonModal(false);
    }

    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal-content"]}>
                <div className={styles["topContainer"]}>
                    <div className={styles["close-container"]}>
                        <ButtonComponent text={`X`} onClick={onClose} className={styles["close-button"]} />
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
                            <ButtonComponent text="Aprobar" onClick={handleApprove} className={styles.customButton} />
                        </div>
                        <div className={styles["rightButtonContainer"]}>
                            <ButtonComponent text="Rechazar" onClick={handleReject} className={styles.cancelButton} />
                        </div>
                    </div>
                </div>
                <div className={styles["bottomContainer"]}>
                    <iframe src={fileUrl} title={documentTitle} className={styles["file-iframe"]} />
                </div>
            </div>
            {showReasonModal && <ReasonModalComponent show={showReasonModal} onClose={handleCloseReasonModal} />}
        </div>
    );
};