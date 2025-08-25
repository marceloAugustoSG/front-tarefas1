import type { Tarefa } from "../types/Tarefas";

const API = 'https://back-tarefas-ancient-voice-361.fly.dev/tarefas';

const handleApiError = async (res: Response): Promise<string> => {
    const text = await res.text();
    try {
        const json = JSON.parse(text);
        if (json && json.message) {
            return json.message;
        }
    } catch (e) {
    }
    return text || res.statusText;
};

export const fetchTasks = async (): Promise<Tarefa[]> => {
    const res = await fetch(API);
    if (!res.ok) throw new Error(await handleApiError(res));
    return res.json();
};

export const createTask = async (payload: Omit<Tarefa, 'id' | 'orderIndex'>) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await handleApiError(res));
};

export const updateTask = async (id: number, payload: Omit<Tarefa, 'id' | 'orderIndex'>) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await handleApiError(res));
};

export const deleteTask = async (id: number) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await handleApiError(res));
};

export const moveTask = async (id: number, direction: 'up' | 'down') => {
    const res = await fetch(`${API}/${id}/mover?direcao=${direction}`, { method: 'PUT' });
    if (!res.ok) throw new Error(await handleApiError(res));
};
