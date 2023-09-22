export const calculatePages = (
  totalHits: number,
  pageSize: number = 10
): number => {
  return totalHits / pageSize + (totalHits % pageSize ? 1 : 0);
};
