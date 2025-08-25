import type { FC } from 'react';
import TarefaItem from '../TarefaItem';
import type { Tarefa } from '../../types/Tarefas';
import styles from './listaTarefa.module.css';

interface Props {
    tasks: Tarefa[];
    draggedIndex: number | null;
    onEdit: (t: Tarefa) => void;
    onDelete: (t: Tarefa) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, i: number) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (i: number) => void;
    onDragEnd: () => void;
    saving: boolean;
}

const TarefasList: FC<Props> = (props) => {
    if (props.tasks.length === 0) return <p style={{ opacity: 0.7 }}>Nenhuma tarefa cadastrada.</p>;

    return (
        <div className={styles.lista}>
            {props.tasks.map((t, i) => (
                <TarefaItem
                    key={t.id}
                    task={t}
                    index={i}
                    draggedIndex={props.draggedIndex}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                    onDragStart={props.onDragStart}
                    onDragOver={props.onDragOver}
                    onDrop={props.onDrop}
                    onDragEnd={props.onDragEnd}
                    saving={props.saving}
                />
            ))}
        </div>
    );
};

export default TarefasList;
