export const calculateSaving = (
  salary: number | undefined,
  dataset: number[]
): number => {
  const total =
    dataset.length > 0 ? dataset.reduce((acc, value) => acc + value, 0) : 0;
  return salary && total ? salary - total : 0;
};
