import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService } from '../../services/gradeService';
import type { UseGradeDeleteReturn } from './types';

export const useGradeDelete = (): UseGradeDeleteReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: gradeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });

  return {
    remove: mutateAsync,
    isDeleting: isPending,
    error: error as Error | null,
  };
};
