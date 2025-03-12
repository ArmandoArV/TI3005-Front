import React from "react";
import styles from "./main.module.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
interface ReasonModalComponentProps {
    show: boolean;
    onClose: () => void;
    onSend?: () => void;
    reason?: string;
}

export const ReasonModalComponent: React.FC<ReasonModalComponentProps> = ({ show, onClose, onSend, reason }) => {
    const [reasonText, setReasonText] = React.useState(reason || "");
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
                        <ButtonComponent text="Guardar" onClick={onSend || (() => { })} className={styles.customButton} />
                    </div>

                </div>
            </div>
        </div>
    );
};