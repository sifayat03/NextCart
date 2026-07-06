import { Hero } from "../component/HOME/Hero";
import { HeroStats } from "../component/HOME/HeroStats";
import { FeaturedCategories } from "../component/HOME/FeaturedCategories";
import { FeaturedProducts } from "../component/HOME/FeaturedProducts";
import { CollectionBanner } from "../component/HOME/CollectionBanner";
import { WhyChooseUs } from "../component/HOME/WhyChooseUs";
import { CTASection } from "../component/HOME/CTASection";



const dummyProducts = [
  {
    _id: 1,
    name: "Apple AirPods Pro",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    price: 19999,
    oldPrice: 24999,
    bestSeller: true,
    newArrival: false,
    stock: 12,
    rating: 4.9,
    reviews: 321,
  },

  // add more products...
];


export const Home = () => {
  return (
    <>
      <Hero />
       <HeroStats />
       <FeaturedCategories />
       <FeaturedProducts products={dummyProducts} />
       <CollectionBanner />
       <WhyChooseUs />
       <CTASection />
      
    </>
  );
};

