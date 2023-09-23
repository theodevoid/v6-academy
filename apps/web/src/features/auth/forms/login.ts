import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Format email harus sesuai'),
  password: z.string().refine((password) => {
    // Minimum length of 8 characters
    if (password.length < 8) {
      return false;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // At least one number
    if (!/\d/.test(password)) {
      return false;
    }

    // At least one special character (you can customize this regex as needed)
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return false;
    }

    return true;
  }, 'Password wajib memiliki 8 karakter, huruf besar, huruf kecil, angka, dan karakter spesial'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
