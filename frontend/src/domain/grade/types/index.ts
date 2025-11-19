export interface Grade {
  id: number;
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType?: 'Tutoria Particular' | 'Escola Pequena' | 'Outro';
  createdAt: string;
  updatedAt?: string;
}

export interface GradeListParams {
  studentName?: string;
  subject?: string;
  institutionType?: string;
}

export interface CreateGradeDto {
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType?: 'Tutoria Particular' | 'Escola Pequena' | 'Outro';
}

export interface UpdateGradeDto {
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType?: 'Tutoria Particular' | 'Escola Pequena' | 'Outro';
}
