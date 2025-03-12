import React from "react";
import styles from "./main.module.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { showConfirmAlert } from "../../Util/AlertUtil";

interface ReasonModalComponentProps {
    show: boolean;
    onClose: () => void;
    onSend?: (ownerId: string, id: string, ownerType: string, reason: string) => void;
    reason?: string;
    ownerId: string;
    id: string;
    ownerType: string;
}

export const ReasonModalComponent: React.FC<ReasonModalComponentProps> = ({ show, onClose, onSend, reason, ownerId, id, ownerType }) => {
    const [reasonText, setReasonText] = React.useState(reason || "");

    const handleSend = () => {
        showConfirmAlert(
            "Confirmación",
            "¿Estás seguro de que quieres enviar esta razón?",
            "Enviar",
            async () => {
                if (onSend) {
                    await onSend(ownerId, id, ownerType, reasonText);
                }
                onClose();
            }
        );
    };

    console.log("ReasonModalComponent", { show, reason, ownerId, id, ownerType });
    return (
        <div className={styles["modal-container"]}>
            <div className={styles.modalContent}>
                <div className={styles.topContainer}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>Razón del rechazo</h2>
                    </div>
                    <div className={styles.textAreaContainer}>
                        <textarea className={styles.textArea} placeholder="Escribe aquí la razón de rechazo"
                            value={reasonText} onChange={(e) => setReasonText(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.buttonContainerLeft}>
                        <ButtonComponent text="Cancelar" onClick={onClose} className={styles.cancelButton} />
                    </div>
                    <div className={styles.buttonContainerRight}>
                        <ButtonComponent text="Guardar" onClick={handleSend} className={styles.customButton} />
                    </div>
                </div>
            </div>
        </div>
    );
};