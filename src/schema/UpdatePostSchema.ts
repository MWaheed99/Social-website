import { z } from "zod";

export const updatePostSchema = z.object({
	body: z.string().optional(),
	image: z.instanceof(File).optional(),
});

export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;
