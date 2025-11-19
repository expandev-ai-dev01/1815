import type { CreateGradeDto, Grade } from '../../types';

export interface UseGradeCreateReturn {
  create: (data: CreateGradeDto) => Promise<Grade>;
  isCreating: boolean;
  error: Error | null;
}
