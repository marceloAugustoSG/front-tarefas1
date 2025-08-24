import { useState, type DragEvent } from 'react'
import styles from './app.module.css'
import Modal from './components/Modal'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit'>('add')
  const [tasks, setTasks] = useState<{ id: string; title: string; cost: string; date: string }[]>([])

  const [editTask, setEditTask] = useState<{
    id: string; title: string; cost: string; date: string
  } | null>(null)

  const [title, setTitle] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: string; title: string; cost: string; date: string } | null>(null);


  const handleAdd = () => {
    setModalType('add')
    setEditTask(null)
    setTitle('')
    setCost('')
    setDate('')
    setShowModal(true)
  }

  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;
    setModalType('edit')
    setEditTask(taskToEdit)
    setTitle(taskToEdit.title)
    setCost(taskToEdit.cost)
    setDate(taskToEdit.date)
    setShowModal(true)
  }

  const handleDelete = (task: { id: string; title: string; cost: string; date: string }) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
    setShowDeleteModal(false);
  }

  const handleClose = () => {
    setShowModal(false)
    setEditTask(null);
    setTitle('')
    setCost('')
    setDate('')
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  }
  const handleSave = () => {
    if (modalType === 'add') {
      const newTask = { title, cost, date, id: String(Date.now()) }
      setTasks([...tasks, newTask])
    } else if (editTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editTask.id ? { ...task, title, cost, date } : task
      );
      setTasks(updatedTasks);
    }
    handleClose();
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newTasks = [...tasks];
    const [draggedItem] = newTasks.splice(draggedItemIndex, 1);
    newTasks.splice(index, 0, draggedItem);

    setTasks(newTasks);
    setDraggedItemIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  }

  console.log(tasks)

  return (
    <div className={styles.container}>
      <h2>Lista de tarefas</h2>
      <button
        className={styles.botaoAddTarefa}
        onClick={handleAdd}
      >
        Adicionar tarefa
      </button>
      <br />
      <br />

      <Modal open={showModal} onClose={handleClose}>
        <h3>{modalType === 'add' ? 'Nova tarefa' : 'Atualizar tarefa'}</h3>
        <br />
        <div className={styles.formGroup}>
          <label>Nome da tarefa</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome da tarefa"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Custo</label>
          <input
            type="text"
            placeholder="Ex: 19,00"
            value={cost}
            onChange={e => setCost(e.target.value.replace(/[^0-9,]/g, ''))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Data limite</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className={styles.botoes}>
          <button className={styles.botao} onClick={() => handleClose()}>Fechar</button>
          <button className={styles.botaoSalvar} onClick={() => handleSave()}>
            Salvar
          </button>
        </div>
      </Modal>

      <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
        <h3>Confirmar Exclusão</h3>
        <br />
        <p>
          Tem certeza que deseja excluir a tarefa "{taskToDelete?.title}"?
        </p>
        <br />
        <div className={styles.botoes}>
          <button className={styles.botao} onClick={handleCloseDeleteModal}>
            Não
          </button>
          <button className={styles.botaoExcluirTarefa} onClick={handleConfirmDelete}>
            Sim
          </button>
        </div>
      </Modal>

      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
          className={styles.container_tarefa}
          style={{ opacity: draggedItemIndex === index ? 0.5 : 1 }}
        >
          <div className={styles.corpo}>

            <span>#{index + 1}</span>
            <strong>{task.title}</strong>
            <span>R$ {task.cost}</span>
            <span>Limite: {task.date}</span>
          </div>

          <div className={styles.acoes}>
            <button className={styles.botao} onClick={() => handleEdit(task.id)} title="Editar tarefa">
              <FaPencilAlt />
            </button>
            <button className={styles.botaoExcluirTarefa} onClick={() => handleDelete(task)} title="Excluir tarefa">
              <FaTrash />
            </button>
          </div>

        </div>
      ))}
    </div>


  )
}

export default App