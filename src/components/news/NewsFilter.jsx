export default function NewsFilters({ search, setSearch, filterCategory, setFilterCategory, filterStatus, setFilterStatus, categories }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input type="text" placeholder="Search..." className="border rounded px-3 py-2 text-sm"
        value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border rounded px-3 py-2 text-sm">
        <option>All</option>
        {categories.map((cat) => <option key={cat.id}>{cat.name}</option>)}
      </select>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded px-3 py-2 text-sm">
        <option>All</option>
        <option>Published</option>
        <option>Draft</option>
      </select>
    </div>
  );
}
