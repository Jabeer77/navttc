import ProductDetails from "@/components/product-page";
import ProductReviews from "@/components/review";
import ProductRecommendations from "@/components/recomended-products";
import { useParams } from "react-router";

export default function Product() {
  const { slug } = useParams();
  console.log("Product slug:", slug);
  return (
    <div>
      <ProductDetails slug={slug}/>
      <ProductReviews/>
      <ProductRecommendations/>
    </div>
  )
}