import type { CreateGradeDto, UpdateGradeDto, Grade } from '../../types';

export interface GradeFormProps {
  initialData?: Grade;
  onSubmit: (data: CreateGradeDto | UpdateGradeDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}
