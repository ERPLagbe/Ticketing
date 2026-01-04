import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MegaMenuItem {
  icon: string;
  title: string;
  subtitle?: string;
  link: string;
}

interface MegaMenuProps {
  title: string;
  categories?: string[];
  items: MegaMenuItem[];
  showExploreAll?: boolean;
  onCategoryHover?: (category: string) => void;
  selectedCategory?: string;
}

export function MegaMenu({ title, categories, items, showExploreAll, onCategoryHover, selectedCategory }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-lg border-t z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-1">
              <span className="w-2 h-2 bg-[#FF6F61] rounded-full"></span>
              {selectedCategory || title}
            </h3>
            {categories && (
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onMouseEnter={() => onCategoryHover?.(category)}
                      className={`text-sm text-left relative inline-block pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full ${
                        selectedCategory === category 
                          ? 'text-gray-900 font-medium' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {showExploreAll && (
              <Link
                to="/search"
                className="inline-flex items-center gap-1 text-sm text-gray-900 hover:text-[#FF6F61] mt-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
              >
                Explore all
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Right Content Grid */}
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 group-hover:text-[#FF6F61] truncate">
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-gray-500 truncate">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}