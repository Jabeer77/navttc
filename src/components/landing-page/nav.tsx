import { Link, Outlet } from "react-router";
import search from "@/assets/search.svg"
import menu from "@/assets/menu.svg"
import searchMobile from "@/assets/search_mobile.svg"
import Profile from "../profile";
import Cart from "../cart";

export default function Nav(){
  return(
    <>
    <header className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 flex items-center gap-4 md:gap-12">
      <nav className="md:hidden">
        <img src={menu} alt="" />
      </nav>
      <h1 className="text-2xl font-bold md:text-4xl md:font-extrabold">
        <Link to="/">SHOP.CO</Link>
      </h1>
      <nav className="hidden sm:block">
        <ul className="flex items-center gap-4 font-semibold">
          <li><Link to="/shop">Shop</Link></li>
          <li>On Sale</li>
          <li>New Arrivals</li>
          <li>Brands</li>
        </ul>
      </nav>
      <div className="flex items-center gap-4 ms-auto lg:ms-0 lg:grow">
      <form className="lg:grow">
      <div className="relative flex items-center rounded-3xl lg:ps-4 focus-within:outline  bg-[#F0F0F0] ">
        <div className="static lg:absolute">
          <img src={search} alt="" className="hidden lg:block" />
          <img src={searchMobile} alt="" className="lg:hidden"/>
        </div>
        <input type="text" className="hidden lg:block ps-8 pe-4 py-3 w-full outline-none" placeholder="Search for products..." />
      </div>
      </form>
      <div className="flex items-center gap-4">
        <Cart/>
        <Profile/>
              </div>
      </div>
    </header>
    <Outlet/>
    </>
  )
}