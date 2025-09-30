import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  description: z.string().optional().default(''),
  price: z.number(),
  images: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
})

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>

export const CategoriesResponseSchema = z.array(
  z.union([
    z.object({ name: z.string(), slug: z.string() }),
    z.string(),
  ])
)


