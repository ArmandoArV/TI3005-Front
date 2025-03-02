import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import styles from "./main.module.css";

interface IFileModalProps {
    documentTitle: string;
    fileUrl: string;
    onClose: () => void;

}

export const FileModal: React.FC<IFileModalProps> = ({ documentTitle, fileUrl, onClose }) => {
    const handleApprove = () => {
        console.log("Approve");
    }

    const handleReject = () => {
        console.log("Reject");
    }
    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal-content"]}>
                <div className={styles["topContainer"]}>
                    <div className={styles["close-container"]}>
                        <button onClick={onClose} className={styles["close-button"]}>
                            X
                        </button>
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
        </div>
    );
};