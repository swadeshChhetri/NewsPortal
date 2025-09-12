const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search"
      className="border rounded pl-9 pr-3 py-1 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
    />
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
  </div>
);
