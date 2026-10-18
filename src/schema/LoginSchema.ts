import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string()
  .email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[!@#$%^&*]/, "Must contain a special character (!@#$%^&*)"),
})


export type LoginFormSchema = z.infer<typeof LoginSchema>;