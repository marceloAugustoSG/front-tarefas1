export const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const parseCost = (c: string) => {
  const normalized = c.replace(/\./g, '').replace(',', '.');
  const n = Number(normalized);
  return isNaN(n) ? null : n;
};

export const toISODate = (yyyy_mm_dd: string) => new Date(`${yyyy_mm_dd}T00:00:00.000Z`).toISOString();
