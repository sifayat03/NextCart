import { ProductCard } from "../ProductCard";


export const  ProductGrid = ({
  products,
  wishlist,
}) => {
  return (
    <div
      className="
      grid
      grid-cols-1
      gap-8
      sm:grid-cols-2
      xl:grid-cols-3
      2xl:grid-cols-4
    "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isWishlisted={wishlist.includes(product._id)}
        />
      ))}
    </div>
  );
}