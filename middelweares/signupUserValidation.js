import { body } from "express-validator";

export const signupUserValidation = [
  body("fullName", "Full name must be required.").notEmpty(),
  body("email", "Enter a valid email.").isEmail(),
  body("password", "Password must be at least six character.").isLength({
    min: 6,
  }),
];
