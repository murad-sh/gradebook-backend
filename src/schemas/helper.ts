import { z } from 'zod';

export const objectId = z.string().uuid();
export const objectDate = z.coerce.date();

export const lessonDataParamsSchema = z.object({
  lessonId: objectId,
  studentId: objectId,
});

export type LessonDataParamsSchemaType = z.infer<typeof lessonDataParamsSchema>;
