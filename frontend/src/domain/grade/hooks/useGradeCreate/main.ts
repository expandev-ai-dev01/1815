import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService } from '../../services/gradeService';
import type { UseGradeCreateReturn } from './types';

export const useGradeCreate = (): UseGradeCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: gradeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });

  return {
    create: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
