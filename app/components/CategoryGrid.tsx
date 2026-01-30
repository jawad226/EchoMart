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
            <div className="group flex flex-col items-center justify-center rounded-2xl p-6 h-full bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
              <div className="w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 relative mb-4">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                />
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-800 text-center group-hover:text-purple-600 transition-colors">
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
