import type { FC, DragEvent } from 'react';
import styles from './TarefaItem.module.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import type { Tarefa } from '../../types/Tarefas';

interface Props {
    task: Tarefa;
    index: number;
    draggedIndex: number | null;
    onEdit: (t: Tarefa) => void;
    onDelete: (t: Tarefa) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, i: number) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (i: number) => void;
    onDragEnd: () => void;
    saving: boolean;
}

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const TarefaItem: FC<Props> = ({
    task, index, draggedIndex,
    onEdit, onDelete,
    onDragStart, onDragOver, onDrop, onDragEnd,
    saving
}) => {
    const backgroundColor = task.custo > 1000 ? 'yellow' : 'white';

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
            onDragEnd={onDragEnd}
            className={styles.container_tarefa}
            style={{ opacity: draggedIndex === index ? 0.5 : 1, backgroundColor, cursor: 'grab' }}
            title="Arraste para reordenar"
        >
            <div className={styles.corpo}>
                <span>#{index + 1}</span>
                <strong>{task.titulo}</strong>
                <span>{moeda.format(task.custo)}</span>
                <span>
                    Limite: {new Date(task.data_limite).toLocaleDateString('pt-BR')}
                </span>

            </div>
            <div className={styles.acoes}>
                <button onClick={() => onEdit(task)} disabled={saving} className={styles.botao}>
                    <FaPencilAlt />
                </button>
                <button onClick={() => onDelete(task)} disabled={saving} className={styles.botaoExcluirTarefa}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TarefaItem;
