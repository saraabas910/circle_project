import * as zod from "zod";
import { emailRegex } from "./emailregex";

  export  const zodSchema = zod.object({
  name: zod.string()
        .nonempty("Full name is required")
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must be less than 50 characters"),


   username: zod.string()
  .nonempty("Username is required")
  .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers")
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be less than 30 characters"),

  email: zod.string()
        .nonempty("Email is required")
        .regex(emailRegex, "Invalid email format"),

  password: zod.string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),

 rePassword : zod.string()
        .nonempty("Confirm password is required"),

  dateOfBirth: zod.string()
        .nonempty("Birthdate is required"),

gender: zod.string()
       .nonempty("Gender is required ")
       .regex(/^(male|female)$/, "Invalid gender value"),

}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",path: ["rePassword"]})
