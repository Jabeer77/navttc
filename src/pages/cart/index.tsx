import { useState } from "react";
import Product1 from "@/assets/product-images/image7.png";
import Product2 from "@/assets/product-images/image8.png";
import Product3 from "@/assets/product-images/image9.png";
import Delete from "@/assets/Vector.svg";


interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  size: string;
  color: string;
  qty?: number; 
}

const initialProducts: Product[] = [
  {
    id: 1,
    image: Product1,
    name: "Black Cotton T-Shirt",
    price: 120,
    size: "Large",
    color: "White",
  },
  {
    id: 2,
    image: Product2,
    name: "Blue Regular Jeans",
    price: 240,
    size: "Medium",
    color: "Red",
  },
  {
    id: 3,
    image: Product3,
    name: "Orange Check Shirt",
    price: 180,
    size: "Large",
    color: "Blue",
  },
];

export default function Cart() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Increase quantity
  const increment = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: (p.qty ?? 1) + 1 } : p
      )
    );
  };

  // Decrease quantity (never below 1)
  const decrement = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max((p.qty ?? 1) - 1, 1) } : p
      )
    );
  };

  // Delete product
  const deleteItem = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );
  const discountPercent = 20;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex gap-2 bg-white py-8 text-gray-600 text-sm md:mx-12 mx-4">
        <p>Home</p>
        <p>{">"}</p>
        <p>Checkout</p>
      </div>

      {/* Main Section */}
      <div className="md:mx-12 mx-4">
        <h1 className="font-black 2xl:text-4xl text-2xl">YOUR CART</h1>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/*PRODUCT LIST */}
          <div className="flex flex-col flex-1">
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 border-b last:border-none"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    className="w-40 lg:w-24 lg:h-24 object-cover rounded-xl"
                    alt={item.name}
                  />

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>

                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>

                    <p className="text-xl font-bold mt-1">${item.price}</p>
                  </div>

                  <div className="flex flex-row lg:flex-col-reverse gap-8">
                    {/* Counter */}
                  <div className="flex bg-gray-100 rounded-full p-1 items-center gap-2">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-8  cursor-pointer h-8 bg-gray-100 rounded-full flex justify-center items-center text-xl"
                      aria-label={`decrease-${item.id}`}
                    >
                      −
                    </button>

                    <span className="text-lg font-medium">
                      {item.qty ?? 1}
                    </span>

                    <button
                      onClick={() => increment(item.id)}
                      className=" cursor-pointer w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center text-xl"
                      aria-label={`increase-${item.id}`}
                    >
                      +
                    </button>
                  </div>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="cursor-pointer flex justify-end px-2"
                    aria-label={`delete-${item.id}`} >
                    <img className="w-4" src={Delete} alt="" />
                  </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="p-6 text-center text-gray-500">Your cart is empty.</div>
              )}
            </div>
          </div>

          {/*ORDER SUMMARY */}
          <div className="w-full lg:w-[380px]">
            <div className="w-full rounded-2xl border p-6 shadow-sm bg-white">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Discount (-{discountPercent}%)</span>
                  <span className="font-medium text-red-500">-${discountAmount}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-medium">${deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t text-lg font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>

              {/* Promo */}
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full pl-4 pr-3 py-2 rounded-full border border-gray-200 bg-gray-100 text-gray-600 focus:outline-none"
                />
                <button className="px-5 py-2 rounded-full bg-black text-white hover:opacity-90">
                  Apply
                </button>
              </div>

              <button className="w-full mt-5 py-3 rounded-full bg-black text-white font-medium hover:opacity-90">
                Go to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
