import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  if (!show) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className="button button-secondary">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="button button-primary"
            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
