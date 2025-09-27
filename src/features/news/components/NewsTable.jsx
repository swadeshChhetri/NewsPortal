export default function NewsTable({ news, onEdit, onDelete}) {

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
          <tr>
            <th className="px-4 py-3 min-w-[100px]">Image</th>
            <th className="px-4 py-3 min-w-[200px]">Title</th>
            <th className="px-4 py-3 min-w-[150px]">Category</th>
            <th className="px-4 py-3 min-w-[120px]">Status</th>
            <th className="px-4 py-3 min-w-[100px]">Highlight</th>
            <th className="px-4 py-3 min-w-[120px]">Created At</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.category_id?.name}</td>
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
              <td className="px-4 py-3">
                {item.is_highlight ? (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                    Yes
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    No
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
