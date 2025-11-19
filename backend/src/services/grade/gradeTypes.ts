/**
 * @summary
 * Grade service type definitions
 * Defines all types and interfaces for grade operations
 *
 * @module services/grade/gradeTypes
 */

/**
 * @interface GradeEntity
 * @description Represents a grade entity in the system
 *
 * @property {number} id - Unique grade identifier
 * @property {string} studentName - Student name
 * @property {string} subject - Subject name
 * @property {number} gradeValue - Grade value (0-10)
 * @property {string | null} institutionType - Institution type
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
export interface GradeEntity {
  id: number;
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface GradeCreateRequest
 * @description Parameters for creating a new grade
 *
 * @property {string} studentName - Student name (3-100 characters)
 * @property {string} subject - Subject name (2-50 characters)
 * @property {number} gradeValue - Grade value (0-10, 2 decimal places)
 * @property {string} [institutionType] - Institution type (optional)
 */
export interface GradeCreateRequest {
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType?: string;
}

/**
 * @interface GradeUpdateRequest
 * @description Parameters for updating an existing grade
 *
 * @property {string} studentName - Student name (3-100 characters)
 * @property {string} subject - Subject name (2-50 characters)
 * @property {number} gradeValue - Grade value (0-10, 2 decimal places)
 * @property {string} [institutionType] - Institution type (optional)
 */
export interface GradeUpdateRequest {
  studentName: string;
  subject: string;
  gradeValue: number;
  institutionType?: string;
}

/**
 * @interface GradeListFilters
 * @description Filter parameters for listing grades
 *
 * @property {string} [studentName] - Filter by student name (partial match)
 * @property {string} [subject] - Filter by subject (partial match)
 * @property {string} [institutionType] - Filter by institution type
 */
export interface GradeListFilters {
  studentName?: string;
  subject?: string;
  institutionType?: string;
}
