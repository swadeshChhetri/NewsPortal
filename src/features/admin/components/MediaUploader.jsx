export default function MediaUploader({ fileInputRef, mediaFile, setMediaFile }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 shadow transition"
      >
        + Add Media
      </button>

      {mediaFile && (
        <span className="text-sm text-gray-700 font-medium">{mediaFile.name}</span>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) setMediaFile(e.target.files[0]);
        }}
        className="hidden"
      />
    </div>
  );
}
