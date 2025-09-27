import { useState, useEffect } from "react";

export default function NewsFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingNews,
  categories,
  onNewsAdded,
}) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    image: null,
    // author_id: 1,
    status: "draft",
    category_id: 1,
    is_highlight: false,
  });

  useEffect(() => {
    if (editingNews) {
     
      setForm({
        title: editingNews.title,
        slug: editingNews.slug,
        content: editingNews.content,
        image: null,
        category_id: editingNews.category_id,
        status: editingNews.status,
        // author_id: editingNews.author_id,
        is_highlight: editingNews.is_highlight === 1,
      });
    } else {
      // Reset form for new news
      setForm({
        title: "",
        slug: "",
        content: "",
        image: null,
        status: "draft",
        category_id: 1,
        is_highlight: false,
      });
    }
  }, [editingNews, isOpen]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      // If the title changes, automatically update the slug
      if (name === "title") {
        const generatedSlug = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove special chars
          .replace(/\s+/g, "-"); // replace spaces with hyphens
        setForm({ ...form, title: value, slug: generatedSlug });
      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, editingNews?._id);
    
    // const formData = new FormData(e.target);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
  };

  if (!isOpen) return null;

 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-3">
          {editingNews ? "Edit News" : "Create News"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          />
          <textarea
            name="content"
            placeholder="Content"
            rows="2"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full text-sm border rounded px-2 py-2 bg-gray-200"
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-2 py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <label className="flex gap-2 text-xs">
            <input
              type="checkbox"
              name="is_highlight"
              checked={form.is_highlight}
              onChange={handleChange}
            />
            Highlight
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-1.5 rounded"
          >
            {editingNews ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
