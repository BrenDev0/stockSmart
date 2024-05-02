const date = new Date();

export const todayDate = new Date().toISOString().slice(0, 10);

export const chartYear = `${date.getFullYear()}-01-01`;
