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
    image: "https://cdn.vox-cdn.com/uploads/chorus_asset/file/24043027/DSCF9466.jpg",
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

