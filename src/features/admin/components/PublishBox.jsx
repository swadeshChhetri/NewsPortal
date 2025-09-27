export default function PublishBox({ status, setStatus, onPublish }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-2 text-yellow-600">Publish</h3>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>Status:</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-yellow-600 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-yellow-400 transition"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end mt-3">
        <button
          onClick={onPublish}
          className="bg-yellow-600 text-white px-5 py-2 rounded-lg hover:bg-yellow-500 shadow transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
