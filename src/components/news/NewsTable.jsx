export default function NewsTable({ news, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
          <tr>
            <th className="px-4 py-3 min-w-[150px]">Title</th>
            <th className="px-4 py-3 min-w-[120px]">Category</th>
            <th className="px-4 py-3 min-w-[120px]">Author</th>
            <th className="px-4 py-3 min-w-[100px]">Status</th>
            <th className="px-4 py-3 min-w-[120px]">Date</th>
            <th className="px-4 py-3 min-w-[120px] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.categories?.name || "N/A"}</td>
              <td className="px-4 py-3">{item.author?.name || "N/A"}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.status === "published"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">{item.created_at?.split("T")[0]}</td>
              <td className="px-4 py-3 text-center space-x-2 flex">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
