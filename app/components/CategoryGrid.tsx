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
            <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl md:rounded-full p-4 sm:p-5 md:p-6 bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
              <div className="w-20 h-16 sm:w-24 sm:h-20 md:w-32 md:h-24 lg:w-36 lg:h-28 relative mb-2 sm:mb-3 md:mb-4">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                />
              </div>
              <p className="text-sm sm:text-base font-medium text-center mt-1 sm:mt-2">
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
