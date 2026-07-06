import ProductSkeleton from "./ProductSkeleton";

export default function ProductSkeletonGrid() {
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
      {[...Array(8)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}