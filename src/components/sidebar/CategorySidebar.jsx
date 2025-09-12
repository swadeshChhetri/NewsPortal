// src/components/sidebar/CategorySidebar.jsx
import { Link } from "react-router-dom";

const CategorySidebar = ({ sideLinks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-3">Categories</h3>
      <ul className="space-y-2 text-sm">
        {sideLinks.map((link, idx) => (
          <Link key={idx} to={`/category/${link.slug}`}>
            <li className="hover:text-yellow-600 cursor-pointer border-b pb-2">
              {link.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
