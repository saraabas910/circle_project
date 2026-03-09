import * as zod from "zod";
import { emailRegex } from "./emailregex";

  export  const zodSchema = zod.object({
 


  email: zod.string()
        .nonempty("Email is required")
        .regex(emailRegex, "Invalid email format"),

  password: zod.string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),


})
