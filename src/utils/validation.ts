import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' })
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, {message: 'Username is required'}),
    password: z
        .string()
        .min(8, 'must be atleast 6 characters')
        .regex(/[A-Z]/, 'Must include an uppercase letter')
        .regex(/[a-z]/, 'Must include a lowercase letter')
        .regex(/[0-9]/, 'Must include a number')
        .regex(/[^A-Za-z0-9]/, 'Must include a special character')
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>