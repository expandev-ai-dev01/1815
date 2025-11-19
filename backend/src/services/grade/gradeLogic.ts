/**
 * @summary
 * Grade business logic implementation
 * Handles all grade operations using in-memory storage
 *
 * @module services/grade/gradeLogic
 */

import {
  GradeEntity,
  GradeCreateRequest,
  GradeUpdateRequest,
  GradeListFilters,
} from './gradeTypes';

// In-memory storage for grades
let grades: GradeEntity[] = [];
let nextId = 1;

/**
 * @summary
 * Creates a new grade record
 *
 * @param {GradeCreateRequest} params - Grade creation parameters
 * @returns {Promise<GradeEntity>} Created grade entity
 */
export async function gradeCreate(params: GradeCreateRequest): Promise<GradeEntity> {
  /**
   * @validation Validate required parameters
   */
  if (!params.studentName || params.studentName.trim().length < 3) {
    throw new Error('studentNameRequired');
  }

  if (!params.subject || params.subject.trim().length < 2) {
    throw new Error('subjectRequired');
  }

  if (params.gradeValue === undefined || params.gradeValue === null) {
    throw new Error('gradeValueRequired');
  }

  /**
   * @validation Validate grade value range
   */
  if (params.gradeValue < 0 || params.gradeValue > 10) {
    throw new Error('gradeValueOutOfRange');
  }

  /**
   * @validation Validate institution type if provided
   */
  if (params.institutionType) {
    const validTypes = ['Tutoria Particular', 'Escola Pequena', 'Outro'];
    if (!validTypes.includes(params.institutionType)) {
      throw new Error('invalidInstitutionType');
    }
  }

  const now = new Date();
  const newGrade: GradeEntity = {
    id: nextId++,
    studentName: params.studentName.trim(),
    subject: params.subject.trim(),
    gradeValue: Math.round(params.gradeValue * 100) / 100,
    institutionType: params.institutionType || null,
    createdAt: now,
    updatedAt: now,
  };

  grades.push(newGrade);

  return newGrade;
}

/**
 * @summary
 * Lists grades with optional filters
 *
 * @param {GradeListFilters} filters - Filter parameters
 * @returns {Promise<GradeEntity[]>} Array of grade entities
 */
export async function gradeList(filters: GradeListFilters): Promise<GradeEntity[]> {
  let filteredGrades = [...grades];

  /**
   * @rule {fn-grade-filtering} Apply filters to grade list
   */
  if (filters.studentName) {
    const searchTerm = filters.studentName.toLowerCase();
    filteredGrades = filteredGrades.filter((grade) =>
      grade.studentName.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.subject) {
    const searchTerm = filters.subject.toLowerCase();
    filteredGrades = filteredGrades.filter((grade) =>
      grade.subject.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.institutionType) {
    filteredGrades = filteredGrades.filter(
      (grade) => grade.institutionType === filters.institutionType
    );
  }

  return filteredGrades;
}

/**
 * @summary
 * Retrieves a specific grade by ID
 *
 * @param {number} id - Grade identifier
 * @returns {Promise<GradeEntity | null>} Grade entity or null if not found
 */
export async function gradeGet(id: number): Promise<GradeEntity | null> {
  const grade = grades.find((g) => g.id === id);
  return grade || null;
}

/**
 * @summary
 * Updates an existing grade
 *
 * @param {number} id - Grade identifier
 * @param {GradeUpdateRequest} params - Update parameters
 * @returns {Promise<GradeEntity | null>} Updated grade entity or null if not found
 */
export async function gradeUpdate(
  id: number,
  params: GradeUpdateRequest
): Promise<GradeEntity | null> {
  const gradeIndex = grades.findIndex((g) => g.id === id);

  if (gradeIndex === -1) {
    return null;
  }

  /**
   * @validation Validate required parameters
   */
  if (!params.studentName || params.studentName.trim().length < 3) {
    throw new Error('studentNameRequired');
  }

  if (!params.subject || params.subject.trim().length < 2) {
    throw new Error('subjectRequired');
  }

  if (params.gradeValue === undefined || params.gradeValue === null) {
    throw new Error('gradeValueRequired');
  }

  /**
   * @validation Validate grade value range
   */
  if (params.gradeValue < 0 || params.gradeValue > 10) {
    throw new Error('gradeValueOutOfRange');
  }

  /**
   * @validation Validate institution type if provided
   */
  if (params.institutionType) {
    const validTypes = ['Tutoria Particular', 'Escola Pequena', 'Outro'];
    if (!validTypes.includes(params.institutionType)) {
      throw new Error('invalidInstitutionType');
    }
  }

  const updatedGrade: GradeEntity = {
    ...grades[gradeIndex],
    studentName: params.studentName.trim(),
    subject: params.subject.trim(),
    gradeValue: Math.round(params.gradeValue * 100) / 100,
    institutionType: params.institutionType || null,
    updatedAt: new Date(),
  };

  grades[gradeIndex] = updatedGrade;

  return updatedGrade;
}

/**
 * @summary
 * Deletes a grade permanently
 *
 * @param {number} id - Grade identifier
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export async function gradeDelete(id: number): Promise<boolean> {
  const gradeIndex = grades.findIndex((g) => g.id === id);

  if (gradeIndex === -1) {
    return false;
  }

  grades.splice(gradeIndex, 1);

  return true;
}
