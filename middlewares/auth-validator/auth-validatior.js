import z from 'zod'

export const userRegisterValidator = () =>{
  return z.object({
    username : z
    .string()
    .trim()
    .min(3, {message : "username must contain atleast 3 characters"})
    .max(10, {message : "username must be less than 10 characters"})
    .regex(/^[a-zA-Z0-9_]+$/, {message : "Only numbers, letters, and underScores allowed"}),

    email : z
    .string()
    .trim()
    .email({message : "Invalid email address"}),

    password : z
    .string()
    .trim()
    .min(6, {message : "Password must contain atleast 6 charcters"})
  }
  )
}