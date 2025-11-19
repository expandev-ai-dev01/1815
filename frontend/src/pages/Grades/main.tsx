import { useState } from 'react';
import { useGradeList } from '@/domain/grade/hooks/useGradeList';
import { useGradeCreate } from '@/domain/grade/hooks/useGradeCreate';
import { useGradeUpdate } from '@/domain/grade/hooks/useGradeUpdate';
import { useGradeDelete } from '@/domain/grade/hooks/useGradeDelete';
import { GradeList } from '@/domain/grade/components/GradeList';
import { GradeForm } from '@/domain/grade/components/GradeForm';
import { GradeFilters } from '@/domain/grade/components/GradeFilters';
import { Modal } from '@/core/components/Modal';
import { ConfirmDialog } from '@/core/components/ConfirmDialog';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { Grade, GradeListParams, CreateGradeDto, UpdateGradeDto } from '@/domain/grade/types';

export const GradesPage = () => {
  const [filters, setFilters] = useState<GradeListParams>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [gradeToDelete, setGradeToDelete] = useState<number | null>(null);

  const { data: grades, isLoading, error, refetch } = useGradeList({ filters });
  const { create, isCreating } = useGradeCreate();
  const { update, isUpdating } = useGradeUpdate();
  const { remove, isDeleting } = useGradeDelete();

  const handleCreateGrade = async (data: CreateGradeDto) => {
    try {
      await create(data);
      setIsCreateModalOpen(false);
      refetch();
    } catch (error: unknown) {
      console.error('Erro ao criar nota:', error);
    }
  };

  const handleEditGrade = async (data: UpdateGradeDto) => {
    if (!selectedGrade) return;

    try {
      await update(selectedGrade.id, data);
      setIsEditModalOpen(false);
      setSelectedGrade(null);
      refetch();
    } catch (error: unknown) {
      console.error('Erro ao atualizar nota:', error);
    }
  };

  const handleDeleteGrade = async () => {
    if (!gradeToDelete) return;

    try {
      await remove(gradeToDelete);
      setIsDeleteDialogOpen(false);
      setGradeToDelete(null);
      refetch();
    } catch (error: unknown) {
      console.error('Erro ao excluir nota:', error);
    }
  };

  const openEditModal = (grade: Grade) => {
    setSelectedGrade(grade);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setGradeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar notas"
        message="Não foi possível carregar a lista de notas. Por favor, tente novamente."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Notas</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nova Nota
        </button>
      </div>

      <GradeFilters filters={filters} onFiltersChange={setFilters} />

      {isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <GradeList
          grades={grades || []}
          onEdit={openEditModal}
          onDelete={openDeleteDialog}
          isDeleting={isDeleting}
        />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nova Nota"
        size="lg"
      >
        <GradeForm
          onSubmit={handleCreateGrade}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={isCreating}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGrade(null);
        }}
        title="Editar Nota"
        size="lg"
      >
        {selectedGrade && (
          <GradeForm
            initialData={selectedGrade}
            onSubmit={handleEditGrade}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedGrade(null);
            }}
            isSubmitting={isUpdating}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setGradeToDelete(null);
        }}
        onConfirm={handleDeleteGrade}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta nota? Esta ação é permanente e não pode ser desfeita."
        confirmText="Excluir"
        isConfirming={isDeleting}
      />
    </div>
  );
};

export default GradesPage;
