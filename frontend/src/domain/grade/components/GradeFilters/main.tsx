import { useState } from 'react';
import type { GradeFiltersProps } from './types';

export const GradeFilters = ({ filters, onFiltersChange }: GradeFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = { studentName: '', subject: '', institutionType: '' };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Filtros</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="filterStudentName" className="block text-sm font-medium text-gray-700">
            Nome do Aluno
          </label>
          <input
            id="filterStudentName"
            type="text"
            value={localFilters.studentName || ''}
            onChange={(e) => handleInputChange('studentName', e.target.value)}
            placeholder="Buscar por nome..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="filterSubject" className="block text-sm font-medium text-gray-700">
            Matéria
          </label>
          <input
            id="filterSubject"
            type="text"
            value={localFilters.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Buscar por matéria..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="filterInstitutionType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Instituição
          </label>
          <select
            id="filterInstitutionType"
            value={localFilters.institutionType || ''}
            onChange={(e) => handleInputChange('institutionType', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="Tutoria Particular">Tutoria Particular</option>
            <option value="Escola Pequena">Escola Pequena</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={handleClearFilters}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Limpar
        </button>
        <button
          onClick={handleApplyFilters}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};
