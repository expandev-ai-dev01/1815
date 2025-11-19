import { format } from 'date-fns';
import type { GradeListProps } from './types';

export const GradeList = ({ grades, onEdit, onDelete, isDeleting }: GradeListProps) => {
  if (grades.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">Nenhuma nota encontrada com os filtros aplicados</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Aluno
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Matéria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nota
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Instituição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Data Criação
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Última Atualização
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {grades.map((grade) => (
            <tr key={grade.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {grade.studentName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{grade.subject}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {grade.gradeValue.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {grade.institutionType || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {format(new Date(grade.createdAt), 'dd/MM/yyyy HH:mm')}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {grade.updatedAt ? format(new Date(grade.updatedAt), 'dd/MM/yyyy HH:mm') : '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(grade)}
                  className="mr-3 text-blue-600 hover:text-blue-900"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(grade.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
