import { parseCost } from "./format";

export const validateTaskForm = (title: string, cost: string, date: string) => {
    const errors: { title?: string; cost?: string; date?: string } = {};
    if (!title.trim()) errors.title = 'O nome da tarefa é obrigatório.';
    if (!cost.trim()) errors.cost = 'O custo é obrigatório.';
    else if (parseCost(cost) === null) errors.cost = 'Informe um custo válido. Ex.: 19,90';
    if (!date.trim()) errors.date = 'A data limite é obrigatória.';
    return errors;
};
