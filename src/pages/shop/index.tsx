import { useEffect, useState } from "react";
import { getProductMetadata, getProducts, type GetProductsResponse, type ProductMetadataResponse } from "@/api/products";
import type { IProduct } from "@/types";
import { Link } from "react-router";
export default function Shop() {
  const [products, setProducts] = useState<GetProductsResponse>({ success: false, count: 0, currentPage: 0, totalPages: 0, totalProducts: 0, data: [] });
  const [metadata, setMetadata] = useState<ProductMetadataResponse>({
    success: false,
    data: {
      categories: [],
      subCategories: [],
      brands: [],
      colors: [],
      colorCode: [],
      sizes: []
    }
  });
  const [color, setColor] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);


  const handleColorChange = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>, color: string) => {
    console.log("Color clicked:", color);
    setColor((prevColors) => {
      if (!prevColors.includes(color)) {        
        return [...prevColors, color];
      }
      return prevColors.filter(c => c !== color);
    });
    // event.currentTarget.parentElement?.querySelectorAll('p').forEach(p => p.style.scale = '1');
    const currentScale = event.currentTarget.style.scale;
    if (currentScale === '1.3') {
      event.currentTarget.style.scale = '1';
      return;
    }
    event.currentTarget.style.scale = '1.3';
  }
  const handleSizeChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, size: string) => {
    setSize((prevSizes) => {
      if (!prevSizes.includes(size)) {        
        return [...prevSizes, size];
      }
      return prevSizes.filter(s => s !== size);
    })
    // event.currentTarget.parentElement?.querySelectorAll('button').forEach(btn => btn.classList.remove('bg-black', 'text-white'));
    const isSelected = event.currentTarget.classList.contains('bg-black');
    if (isSelected) {
      event.currentTarget.classList.remove('bg-black', 'text-white');
    event.currentTarget.classList.add('bg-gray-100');
      return;
    }
    event.currentTarget.classList.remove('bg-gray-100');
    event.currentTarget.classList.add('bg-black', 'text-white');
  }
  const handleCategoryChange = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, category: string) => {
    setCategory(category);
    event.currentTarget.parentElement?.querySelectorAll('li').forEach(li => li.classList.remove('font-bold'));
    event.currentTarget.classList.add('font-bold');
  }
  const handleSubCategoryChange = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, subCategory: string) => {
    setSubCategory(subCategory);
    event.currentTarget.parentElement?.querySelectorAll('li').forEach(li => li.classList.remove('font-bold'));
    event.currentTarget.classList.add('font-bold');
  }
  const handlePageChange = async (page: number) => {
    if(page<1 || page>products.totalPages) return;
    const _products = await getProducts(maxPrice, color.join(','), size.join(','),category,subCategory,page);
    console.log("Filtered products:", _products);
    if (!_products) return;
    setProducts(_products);
  }
  const handleFilter = async () => {
    const products = await getProducts(maxPrice, color.join(','), size.join(','),category,subCategory);
    console.log("Filtered products:", products);
    if (!products) return;
    setProducts(products);
  }
  useEffect(() => {
    (async () => {
      const products = await getProducts();
      const metadata = await getProductMetadata();
      if (products) setProducts(products);
      if (metadata) setMetadata(metadata);
    })();
  }, []);
  return (
    <>
      <div className="flex gap-2 w-full bg-white py-8 px-8 text-gray-600 text-sm">
        <p>Home</p>
        <p>{">"}</p>
        <p>Casual</p>
      </div>
      <div className="flex w-full bg-white px-8">
        {/* Sidebar Filters */}
        <aside className="w-64 h-full p-6 border border-gray-200 rounded-md hidden lg:block">
          <h2 className="text-lg
         font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <ul className="space-y-1 text-gray-600 text-sm">
            {
              metadata && metadata.data.subCategories.map((subCategory) => (
                <li key={subCategory} onClick={(e) => handleSubCategoryChange(e, subCategory)} className="cursor-pointer">{subCategory}</li>
              ))
            }
            </ul>
          </div>

          {/* Price Slider */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price</h3>
            <input type="range" className="w-full" min={0} max={100} step={10} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              {metadata && metadata.data.colorCode.map((color) => (
                <p key={color} onClick={(e) => handleColorChange(e, color)}
                 className={`w-6 h-6 rounded-full cursor-pointer border`}
                 style={{ backgroundColor: color }}>
                 </p>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2 text-gray-500 text-sm">
              {metadata && metadata.data.sizes.map((size) => (
                <button key={size} onClick={(e) => handleSizeChange(e, size)} className="px-3 py-1 bg-gray-100 border rounded-2xl" >{size}</button>
              ))}
            </div>
          </div>


          {/* Dress Style */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Dress Style</h3>
            <ul className="space-y-1 text-gray-600 text-sm">
            {
              metadata && metadata.data.categories.map((category) => (
                <li key={category} onClick={(e) => handleCategoryChange(e, category)} className="cursor-pointer">{category}</li>
              ))
            }
            </ul>
          </div>
          <button onClick={handleFilter} className="w-full bg-black text-white py-2 rounded-lg mt-4">Apply Filter</button>
        </aside>

        {/* Products Section */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Casual</h2>
            <p className="text-sm text-gray-500">Showing {products.currentPage === 1 ? 1 : products.currentPage*products.count}-{(products.currentPage === 1 ? 0 : products.currentPage*products.count)+products.count} of {products && products.totalProducts} Products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {products && products.data && products.data.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>


          {/* Previous/Next */}
          <div className="flex justify-between items-center mt-10 gap-3">
            <button onClick={()=>handlePageChange(products.currentPage-1)}
            className="px-4 py-2 border rounded-lg"> <span className="font-bold">← </span>Previous</button>
            <div className="flex">
              <p className="px-3 py-1  border rounded-lg cursor-pointer">1</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">2</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">3</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">...</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">8</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">9</p>
              <p className="px-3 py-1 text-gray-500 rounded-lg cursor-pointer">10</p>
            </div>
            <button onClick={()=>handlePageChange(products.currentPage+1)} className="px-4 py-2 border rounded-lg">Next<span className="font-bold"> →</span></button>
          </div>
        </main>
      </div>

    </>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link to={`/product/${product.slug}`}>
    <div className="p-4 border rounded-xl">
      <img className="w-full h-52 rounded-lg mb-3 " src={product.thumbnail} alt="shirt1" />
      <h3 className="font-medium mb-1">{product.title}</h3>
      <p className="text-gray-500 text-sm mb-1">⭐⭐⭐☆ ({product.rating})</p>
      <p className="font-semibold">${product.price}</p>
    </div>
    </Link>
  )
}