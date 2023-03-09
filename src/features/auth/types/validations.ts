import { z } from 'zod';

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(6, { message: 'At least 8 characters' })
  .max(100)
  .transform((str) => str.trim());

export const Signup = z
  .object({
    email,
    password,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: "Passwords don't match",
  });

export const UserAuthenticate = z.object({
  email,
  password,
});

export const ForgotPassword = z.object({
  email,
});

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'], // set the path of the error
  });

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
});
