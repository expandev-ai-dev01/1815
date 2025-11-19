export interface UseGradeDeleteReturn {
  remove: (id: number) => Promise<void>;
  isDeleting: boolean;
  error: Error | null;
}
