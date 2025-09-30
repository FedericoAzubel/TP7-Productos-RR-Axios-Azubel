import axios from 'axios'
import { ProductSchema, ProductsResponseSchema, type Product } from '../types/product'

const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export async function fetchCategories(): Promise<{ name: string; slug: string }[]> {
  const res = await client.get('/products/categories')
  const categories = Array.isArray(res.data) ? res.data : []
  const normalized = categories
    .slice(0, 9)
    .map((c: any) => (typeof c === 'string' ? { name: c, slug: c } : { name: String(c?.name ?? ''), slug: String(c?.slug ?? '') }))
    .filter((c: { name: string; slug: string }) => c.name && c.slug)
  return [{ name: 'Destacados', slug: 'destacados' }, ...normalized]
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category && category !== 'destacados' ? `/products/category/${category}` : '/products'
  const res = await client.get(url)
  const parsed = ProductsResponseSchema.safeParse(res.data)
  if (!parsed.success) return []
  return parsed.data.products
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  const res = await client.get(`/products/${id}`)
  const parsed = ProductSchema.safeParse(res.data)
  if (!parsed.success) return null
  return parsed.data
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await client.get(`/products/search`, { params: { q: query } })
  const parsed = ProductsResponseSchema.safeParse(res.data)
  if (!parsed.success) return []
  return parsed.data.products
}


