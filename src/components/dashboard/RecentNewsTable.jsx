const RecentNewsTable = ({ newsData }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent News</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {newsData.slice(0, 5).map((news) => (
            <tr key={news.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{news.title}</td>
              <td className="p-3">{news.categories?.name || "N/A"}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    news.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {news.status}
                </span>
              </td>
              <td className="p-3 text-gray-500">
                {news.created_at
                  ? new Date(news.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentNewsTable;
