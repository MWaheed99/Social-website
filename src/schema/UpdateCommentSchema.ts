import { z } from "zod";

export const updateCommentSchema = z.object({
	content: z.string().optional(),
	image: z.instanceof(File).optional(),
});

export type UpdateCommentFormValues = z.infer<typeof updateCommentSchema>;
