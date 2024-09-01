import {z} from "zod"

export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
}) ;

export type signUpTypeInput = z.infer<typeof signUpInput> ;


export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
}) ;

export type signInTypeInput = z.infer<typeof signInInput> ;


export const createPostInput = z.object({
    title: z.string(),
    content: z.string().min(6),
}) ; 

export type createPostTypeInput = z.infer<typeof createPostInput> ;


export const updatePostInput = z.object({
    title: z.string(),
    content: z.string().min(6),
}) ; 

export type updatePostTypeInput = z.infer<typeof createPostInput> ;



