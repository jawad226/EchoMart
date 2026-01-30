import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  title: string;
  image: string;
  href: string; // add href for each category
}

const categories: CategoryItem[] = [
  { title: "Earbuds", image: "/EarFun.png", href: "/category/Earbuds" },
  { title: "Adaptor", image: "/adp.png", href: "/category/Adaptor" },
  { title: "Headphones", image: "/headphone.png", href: "/category/Headphones" },
  { title: "Mobile Phone Case", image: "/phone.png", href: "/category/MobilePhoneCase" },
];

export default function CategoryGrid() {
  return (
    <div className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <Link key={cat.title} href={cat.href} passHref>
            <div className="flex flex-col items-center rounded-2xl p-4 sm:p-5 md:p-6 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.03]">
              <div className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 relative mb-2 sm:mb-3 md:mb-4">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-center mt-1 sm:mt-2 text-gray-800">
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
