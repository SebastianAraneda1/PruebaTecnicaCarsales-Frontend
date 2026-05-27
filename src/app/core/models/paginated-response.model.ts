export interface PaginatedResponse<T> {
  count: number;
  pages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: T[];
}
