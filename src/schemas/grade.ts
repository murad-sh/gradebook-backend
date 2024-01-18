import { z } from 'zod';

import { objectDate, objectId } from './helper';

export const gradeSchema = z.object({
  score: z.number(),
  studentId: objectId,
  lessonId: objectId,
  comment: z.string(),
  assessmentDate: objectDate,
});

export type GradeSchemaType = z.infer<typeof gradeSchema>;

export const gradeUpdateSchema = z.object({
  score: z.number(),
  comment: z.string(),
  assessmentDate: objectDate,
});

export type GradeUpdateSchemaType = z.infer<typeof gradeUpdateSchema>;

export const gradeIdSchema = z.object({
  gradeId: objectId,
});
