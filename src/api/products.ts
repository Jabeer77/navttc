import type { IProduct } from "@/types";

export interface GetProductsResponse {
  success: boolean;
  count: number;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  data: IProduct[];
}

export async function getProducts(
  maxPrice?: number,
  color?: string, 
  size?: string,
  category?: string,
  subCategory?: string, 
  page?: number
): Promise<GetProductsResponse | null> {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/products?
    ${maxPrice ? `maxPrice=${maxPrice}&` : ''}
    ${color ? `colors=${encodeURIComponent(color)}&` : ''}
    ${size ? `sizes=${size}&` : ''}
    ${category ? `category=${category}&` : ''}
    ${subCategory ? `subCategory=${subCategory}&` : ''}
    ${page ? `page=${page}&` : ''}`.replace(/\s+/g, ''));
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched products:", data);
    return data as GetProductsResponse;
  } catch (error: unknown) {
    console.error("Failed to fetch products:", (error as Error).message);
    return null;
  }
}

export interface ProductMetadataResponse {
  success: boolean;
  data: {
    categories: string[],
    subCategories: string[],
    brands: string[],
    colors: string[],
    colorCode: string[],
    sizes: string[]
  },
}

export async function getProductMetadata() {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/products/metadata`);
    if (!response.ok) {
      throw new Error(`Error fetching product metadata: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched product metadata:", data);
    return data as ProductMetadataResponse;
  } catch (error: unknown) {
    console.error("Failed to fetch product metadata:", (error as Error).message);
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/products/${slug}`);
    if (!response.ok) {
      throw new Error(`Error fetching product by slug: ${response.statusText}`);
    }
    const result = await response.json();
    if(!result.success){
      throw new Error(`Error fetching product by slug: ${result.message}`);
    }
    return result.data as IProduct;
  }
  catch (error: unknown) {
    console.error("Failed to fetch product by slug:", (error as Error).message);
    return null;
  }
}