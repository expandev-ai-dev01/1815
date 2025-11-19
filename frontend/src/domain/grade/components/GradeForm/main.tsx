import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { GradeFormProps } from './types';

const gradeSchema = z.object({
  studentName: z
    .string()
    .min(3, 'O nome do aluno deve ter pelo menos 3 caracteres')
    .max(100, 'O nome do aluno deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome do aluno deve conter apenas letras e espaços'),
  subject: z
    .string()
    .min(2, 'A matéria deve ter pelo menos 2 caracteres')
    .max(50, 'A matéria deve ter no máximo 50 caracteres'),
  gradeValue: z
    .number()
    .min(0, 'A nota deve estar entre 0 e 10')
    .max(10, 'A nota deve estar entre 0 e 10'),
  institutionType: z.enum(['Tutoria Particular', 'Escola Pequena', 'Outro']).optional(),
});

type GradeFormData = z.infer<typeof gradeSchema>;

export const GradeForm = ({ initialData, onSubmit, onCancel, isSubmitting }: GradeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: initialData
      ? {
          studentName: initialData.studentName,
          subject: initialData.subject,
          gradeValue: initialData.gradeValue,
          institutionType: initialData.institutionType,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: GradeFormData) => {
    try {
      await onSubmit(data);
    } catch (error: unknown) {
      console.error('Erro ao salvar nota:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
          Nome do Aluno *
        </label>
        <input
          id="studentName"
          type="text"
          {...register('studentName')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.studentName && (
          <p className="mt-1 text-sm text-red-600">{errors.studentName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Matéria *
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="gradeValue" className="block text-sm font-medium text-gray-700">
          Nota (0-10) *
        </label>
        <input
          id="gradeValue"
          type="number"
          step="0.01"
          {...register('gradeValue', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.gradeValue && (
          <p className="mt-1 text-sm text-red-600">{errors.gradeValue.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700">
          Tipo de Instituição
        </label>
        <select
          id="institutionType"
          {...register('institutionType')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Selecione...</option>
          <option value="Tutoria Particular">Tutoria Particular</option>
          <option value="Escola Pequena">Escola Pequena</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.institutionType && (
          <p className="mt-1 text-sm text-red-600">{errors.institutionType.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};
