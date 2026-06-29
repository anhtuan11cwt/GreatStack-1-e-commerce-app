import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 py-4 text-gray-500 text-sm">
      <Link
        className="flex items-center transition-colors hover:text-gray-700"
        to="/"
      >
        <Home size={18} />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="flex items-center gap-1.5" key={item.label}>
            <ChevronRight className="text-gray-300" size={16} />
            {isLast ? (
              <span className="font-medium text-indigo-500">{item.label}</span>
            ) : item.to ? (
              <Link
                className="transition-colors hover:text-gray-700"
                to={item.to}
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
