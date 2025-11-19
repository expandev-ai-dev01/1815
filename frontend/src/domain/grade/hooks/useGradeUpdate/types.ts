import type { UpdateGradeDto, Grade } from '../../types';

export interface UseGradeUpdateReturn {
  update: (id: number, data: UpdateGradeDto) => Promise<Grade>;
  isUpdating: boolean;
  error: Error | null;
}
