import { useEffect, useState, type FC } from 'react';
import Modal from '../Modal';
import styles from './modal.module.css';
import { validateTaskForm } from '../../utils/validation';
import { parseCost, toISODate } from '../../utils/format';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (payload: { titulo: string; custo: number; data_limite: string }) => void;
    saving: boolean;
    task?: { titulo: string; custo: number; data_limite: string };
}

const TaskModal: FC<Props> = ({ open, onClose, onSave, saving, task }) => {
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState<{ title?: string; cost?: string; date?: string }>({});

    useEffect(() => {
        if (open) {
            setTitle(task?.titulo || '');
            setCost(task?.custo?.toString().replace('.', ',') || '');
            setDate(task?.data_limite?.split('T')[0] || '');
            setErrors({});
        }
    }, [open, task]);

    const handleSave = () => {
        const errs = validateTaskForm(title, cost, date);
        if (Object.keys(errs).length > 0) return setErrors(errs);

        onSave({ titulo: title.trim(), custo: parseCost(cost)!, data_limite: toISODate(date) });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h3>{task ? 'Atualizar tarefa' : 'Nova tarefa'}</h3>

            <div className={styles.formGroup}>
                <label>Nome</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={saving} />
                {errors.title && <span className={styles.error}>{errors.title}</span>}
            </div>

            <div className={styles.formGroup}>
                <label>Custo</label>
                <input
                    value={cost}
                    onChange={(e) => setCost(e.target.value.replace(/[^0-9.,]/g, ''))}
                    disabled={saving}
                />
                {errors.cost && <span className={styles.error}>{errors.cost}</span>}
            </div>

            <div className={styles.formGroup}>
                <label>Data limite</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={saving} />
                {errors.date && <span className={styles.error}>{errors.date}</span>}
            </div>

            <div className={styles.botoes}>
                <button className={styles.botao} onClick={onClose} disabled={saving}>Fechar</button>
                <button className={styles.botaoSalvar} onClick={handleSave} disabled={saving}>Salvar</button>
            </div>
        </Modal>
    );
};

export default TaskModal;
