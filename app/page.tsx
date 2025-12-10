import BannerDrone from "./components/BannerDrone";
import BannerHelp from "./components/BannerHelp";
import BestSellers from "./components/BestSellers";
import CategoryGrid from "./components/CategoryGrid";
import FeaturesStrip from "./components/FeaturesStrip";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import OnSale from "./components/OnSale";
import PromoBanner from "./components/PromoBanner";
import PromoSection from "./components/PromoSection";

export default function page() {
  return (
    <div>
      <Hero />
      <PromoSection />
      <FeaturesStrip />
      <BestSellers />
      <PromoBanner />
      <OnSale />
      <CategoryGrid />
      <BannerDrone />
      <Newsletter />
      <BannerHelp />
    </div>
  )
}
