import { Search } from "lucide-react";

const SearchBar = () => (
  <div className="relative w-full max-w-xs">
    <input
      type="text"
      placeholder="Search users..."
      className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 outline-none transition"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
);

export default SearchBar;
