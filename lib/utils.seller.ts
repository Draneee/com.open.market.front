import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(254),
  //   nickname: z.string().max(254),
  password: z.string().min(8).max(254),
});
export const registerSchema = z
  .object({
    nickname: z.string().max(254),
    email: z.string().email().max(254),
    password: z
      .string()
      .min(8, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' }),
    confirmPassword: z.string().min(8).max(254),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const addProductSchema = z.object({
  id: z.number().optional(),
  productName: z.string().max(254),
  SKU: z.string().min(8).max(254),
  quantity: z.coerce.number().min(1).max(10000),
  price: z
    .number()
    .min(1)
    .max(10000000)
    .transform((v) => Number(v) || 0),
  picture: z
    .any()
    .refine(
      (file) =>
        typeof file === 'string' ||
        (file?.length == 1 &&
          file[0]?.size <= 3000000 &&
          file[0]?.type?.includes('image/')),
      'Invalid picture.'
    ),
});

// picture: z
//     .any()
//     .refine((file) => file?.length == 1, 'File is required.')
//     .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`)
//     .refine((file) => file[0]?.type.includes('image/'), `Only accept images.`),
