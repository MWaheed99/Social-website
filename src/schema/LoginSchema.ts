import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string()
  .email({ message: "Invalid email address" }),
  password: z.string()
  .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
})


export type LoginFormSchema = z.infer<typeof LoginSchema>;