import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(20, { message: "Name must be less than 20 characters" }),
  username: z.string()
  .min(2, { message: "Username must be at least 2 characters" })
  .max(20, { message: "Username must be less than 20 characters" }),
  email: z.string()
  .email({ message: "Invalid email address" }),
  password: z.string()
  .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
  rePassword: z.string()
  .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }),
  dateOfBirth: z.string()
  .refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 13;
  }, { message: "Invalid date of birth - you must be at least 13 years old" }),
  gender: z.enum(["male", "female"], { message: "Gender must be either male or female" })
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match", path: ["rePassword"]
});

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;
