import { authenticatedClient } from '@/core/lib/api';
import type { Grade, GradeListParams, CreateGradeDto, UpdateGradeDto } from '../types';
import type { ApiResponse } from '@/core/types';

export const gradeService = {
  async list(params?: GradeListParams): Promise<Grade[]> {
    const response = await authenticatedClient.get<ApiResponse<Grade[]>>('/grade', { params });
    return response.data.data;
  },

  async getById(id: number): Promise<Grade> {
    const response = await authenticatedClient.get<ApiResponse<Grade>>(`/grade/${id}`);
    return response.data.data;
  },

  async create(data: CreateGradeDto): Promise<Grade> {
    const response = await authenticatedClient.post<ApiResponse<Grade>>('/grade', data);
    return response.data.data;
  },

  async update(id: number, data: UpdateGradeDto): Promise<Grade> {
    const response = await authenticatedClient.put<ApiResponse<Grade>>(`/grade/${id}`, data);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/grade/${id}`);
  },
};
