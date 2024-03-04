import { z } from "zod";

const createUserSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/, {
        message:
          "Password must contain at least one uppercase character, one symbol, and one digit",
      }),
    confirmPassword: z.string(),
    phone: z.string().min(10, { message: "Invalid phone number" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default createUserSchema;
