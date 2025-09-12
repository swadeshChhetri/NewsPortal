const RecentComments = ({ comments }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Comments</h2>
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((c) => (
          <div
            key={c.id}
            className="border p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{c.user}</span>: {c.comment}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(c.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  </div>
);

export default RecentComments;
