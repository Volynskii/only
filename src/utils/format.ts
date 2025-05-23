export const getTotal = (length: number, index: number): string =>
    `${String(index + 1).padStart(2, '0')}/${String(length).padStart(2, '0')}`;

export default getTotal;