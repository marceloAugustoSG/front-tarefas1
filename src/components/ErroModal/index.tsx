import styles from './erromodal.module.css';

interface ErrorModalProps {
    open: boolean;
    onClose: () => void;
    errorMessage: string | null;
}

const ErrorModal = ({ open, onClose, errorMessage }: ErrorModalProps) => {
    if (!open || !errorMessage) {
        return null;
    }

    return (
        <div className={styles.errorOverlay} onClick={onClose}>
            <div className={styles.errorModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Ocorreu um Erro</h2>
                </div>
                <div className={styles.modalBody}>
                    <p>{errorMessage}</p>
                </div>
                <div className={styles.modalFooter}>
                    <button  onClick={onClose} className={styles.botao}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
