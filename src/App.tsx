
import type { Tarefa } from './types/Tarefas';
import { fetchTasks, createTask, updateTask, deleteTask, moveTask } from './api/tarefas';
import TaskModal from './components/TaskModal';
import DeleteModal from './components/DeleteModal';
import TarefasList from './components/ListaTarefas';
import styles from '@/app.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Tarefa | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Tarefa | null>(null);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const loadTasks = async () => {
    try { setLoading(true); setError(null); const data = await fetchTasks(); setTasks(data); }
    catch (e: any) { setError(e.message); } finally { setLoading(false); }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleSave = async (payload: { titulo: string; custo: number; data_limite: string }) => {
    try {
      setSaving(true);
      if (editTask) await updateTask(editTask.id, payload);
      else await createTask(payload);
      setShowModal(false);
      setEditTask(null);
      await loadTasks();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    try { setSaving(true); await deleteTask(taskToDelete.id); setShowDeleteModal(false); setTaskToDelete(null); await loadTasks(); }
    catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const handleMove = async (taskId: number, from: number, to: number) => {
    if (from === to) return;
    const direction = from > to ? 'up' : 'down';
    const newTasks = [...tasks];
    const [moved] = newTasks.splice(from, 1);
    newTasks.splice(to, 0, moved);
    setTasks(newTasks);
    try { await moveTask(taskId, direction); await loadTasks(); } catch (e: any) { alert(e.message); await loadTasks(); }
  };

  return (
    <div className={styles.container}>
      <h2>Lista de tarefas {loading && '(carregando...)'}</h2>
      {error && <span className={styles.error}>{error}</span>}
      <button className={styles.botaoAddTarefa} onClick={() => { setEditTask(null); setShowModal(true); }} disabled={saving}>Adicionar tarefa</button>

      <TaskModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSave} saving={saving} task={editTask || undefined} />
      <DeleteModal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} saving={saving} taskTitle={taskToDelete?.titulo} />

      <TarefasList
        tasks={tasks}
        draggedIndex={draggedIndex}
        onEdit={(t) => { setEditTask(t); setShowModal(true); }}
        onDelete={(t) => { setTaskToDelete(t); setShowDeleteModal(true); }}
        onDragStart={(e, i) => setDraggedIndex(i)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(i) => { if (draggedIndex !== null) handleMove(tasks[draggedIndex].id, draggedIndex, i); setDraggedIndex(null); }}
        onDragEnd={() => setDraggedIndex(null)}
        saving={saving}
      />
    </div>
  );
}

export default App;
