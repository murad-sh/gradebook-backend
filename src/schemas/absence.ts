import { z } from 'zod';

import { objectDate, objectId } from './helper';

export const absenceSchema = z.object({
  date: objectDate,
  lessonId: objectId,
  studentId: objectId,
});

export type AbsenceSchemaType = z.infer<typeof absenceSchema>;

export const absenceIdSchema = z.object({
  absenceId: objectId,
});
