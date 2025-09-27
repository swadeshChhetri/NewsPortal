const RecentNewsTable = ({ newsData }) => (
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
      </tr>
    </thead>
    <tbody>
      {newsData.map((item) => (
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
        </tr>
      ))}
    </tbody>
  </table>
</div>

  // <div className="bg-white rounded-xl shadow p-6">
  //   <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent News</h2>
  //   <div className="overflow-x-auto">
  //     <table className="w-full text-left border-collapse">
  //       <thead>
  //         <tr className="bg-gray-100 text-gray-600 text-sm">
  //           <th className="p-3">Title</th>
  //           <th className="p-3">Category</th>
  //           <th className="p-3">Status</th>
  //           <th className="p-3">Date</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {newsData.slice(0, 5).map((news) => (
  //           <tr key={news._id} className="border-b hover:bg-gray-50">
  //             <td className="p-3">{news.title}</td>
  //             <td className="p-3">{news.categories?.name || "N/A"}</td>
  //             <td className="p-3">
  //               <span
  //                 className={`px-2 py-1 rounded text-xs ${
  //                   news.status === "published"
  //                     ? "bg-green-100 text-green-700"
  //                     : "bg-yellow-100 text-yellow-700"
  //                 }`}
  //               >
  //                 {news.status}
  //               </span>
  //             </td>
  //             <td className="p-3 text-gray-500">
  //               {news.created_at
  //                 ? new Date(news.created_at).toLocaleDateString("en-US", {
  //                     month: "short",
  //                     day: "numeric",
  //                     year: "numeric",
  //                   })
  //                 : "—"}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // </div>
);

export default RecentNewsTable;
