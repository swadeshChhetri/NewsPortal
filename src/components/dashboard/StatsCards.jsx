const StatsCards = ({ stats }) => {
  const items = [
    { label: "Total News", value: stats.totalNews },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.drafts },
    { label: "Categories", value: stats.categories },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
        >
          <p className="text-lg font-semibold text-gray-700">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
