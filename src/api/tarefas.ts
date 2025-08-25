import type { Tarefa } from "../types/Tarefas";

const API = 'http://localhost:3000/tarefas';

export const fetchTasks = async (): Promise<Tarefa[]> => {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Falha ao carregar tarefas');
    return res.json();
};

export const createTask = async (payload: Omit<Tarefa, 'id' | 'orderIndex'>) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
};

export const updateTask = async (id: number, payload: Omit<Tarefa, 'id' | 'orderIndex'>) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
};

export const deleteTask = async (id: number) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
};

export const moveTask = async (id: number, direction: 'up' | 'down') => {
    const res = await fetch(`${API}/${id}/mover?direcao=${direction}`, { method: 'PUT' });
    if (!res.ok) throw new Error(await res.text());
};
