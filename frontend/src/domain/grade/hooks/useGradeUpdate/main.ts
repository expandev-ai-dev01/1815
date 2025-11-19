import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService } from '../../services/gradeService';
import type { UseGradeUpdateReturn } from './types';

export const useGradeUpdate = (): UseGradeUpdateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => gradeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });

  return {
    update: (id, data) => mutateAsync({ id, data }),
    isUpdating: isPending,
    error: error as Error | null,
  };
};
