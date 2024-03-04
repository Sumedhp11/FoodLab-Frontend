import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  email: z.string().regex(emailRegex, "Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .refine((value) => {
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must contain at least one capital letter");
      }
      if (!/[\W_]/.test(value)) {
        throw new Error("Password must contain at least one symbol");
      }
      return true;
    }, "Password must meet complexity requirements"),
});

export default loginSchema;
