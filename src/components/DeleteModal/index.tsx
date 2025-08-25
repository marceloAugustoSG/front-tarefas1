import Modal from '../Modal';
import styles from './delete.module.css';
import { type FC } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    saving: boolean;
    taskTitle?: string;
}

const DeleteModal: FC<Props> = ({ open, onClose, onConfirm, saving, taskTitle }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir a tarefa "{taskTitle}"?</p>
            <div className={styles.botoes}>
                <button onClick={onClose} disabled={saving} className={styles.botao}>
                    Não
                </button>
                <button onClick={onConfirm} disabled={saving} className={styles.botaoExcluirTarefa}>
                    Sim
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
