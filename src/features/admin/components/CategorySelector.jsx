export default function CategorySelector({
  categories,
  selectedCategories,
  setSelectedCategories,
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-2 text-yellow-600">Categories</h3>
      <div className="space-y-2 text-sm">
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={cat.id}
                checked={selectedCategories.includes(cat.id)}
                onChange={() => {
                  if (selectedCategories.includes(cat.id)) {
                    setSelectedCategories(
                      selectedCategories.filter((id) => id !== cat.id)
                    );
                  } else {
                    setSelectedCategories([...selectedCategories, cat.id]);
                  }
                }}
                className="accent-yellow-600"
              />
              {cat.name}
            </label>
          ))}
      </div>
    </div>
  );
}
