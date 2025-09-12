import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/Layout";
import { toast } from "react-hot-toast";
import {MultimediaAPI} from "../../services/api"; // ✅ import services

const MultimediaManagement = () => {
  const [multimediaList, setMultimediaList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    type: "image",
    title: "",
    description: "",
    file: null,
    news_id: "",
    status: "active",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadMultimedia();
  }, []);

  const loadMultimedia = async () => {
    try {
      const data = await MultimediaAPI.fetchAll();
      setMultimediaList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load multimedia ❌");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData({ ...formData, file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("type", formData.type);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("status", formData.status);
      if (formData.news_id) data.append("news_id", formData.news_id);
      if (formData.file) data.append("file", formData.file);

      if (editing) {
        await MultimediaAPI.update(formData.id, data);
        toast.success("Multimedia updated successfully ✨");
      } else {
        await MultimediaAPI.create(data);
        toast.success("Multimedia added successfully 🎉");
      }

      setFormData({
        id: null,
        type: "image",
        title: "",
        description: "",
        file: null,
        news_id: "",
        status: "active",
      });
      setPreviewUrl(null);
      setEditing(false);
      loadMultimedia();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save multimedia ❌");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description || "",
      file: null,
      news_id: item.news_id || "",
      status: item.status,
    });
    setPreviewUrl(item.url);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await MultimediaAPI.delete(id);
      toast.success("Multimedia deleted ✅");
      loadMultimedia();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete multimedia ❌");
    }
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Multimedia Management</h1>
          <p className="text-gray-600">
            Manage all images and videos used across the site.
          </p>
        </div>
        <button
          onClick={() => setEditing(false)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Add New Multimedia
        </button>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Edit Multimedia" : "Add New Multimedia"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              accept="image/*,video/*"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="my-4">
              <p className="font-medium mb-2">Preview:</p>
              {formData.type === "image" ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="w-48 h-32 border rounded"
                />
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Update Multimedia" : "Save Multimedia"}
          </button>
        </form>
      </div>

      {/* Multimedia Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Multimedia List</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Preview</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {multimediaList.map((item, index) => (
              <tr key={item.id} className="text-sm hover:bg-gray-50">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <video src={item.url} className="w-24 h-16" controls />
                  )}
                </td>
                <td className="p-2 border">{item.status}</td>
                <td className="p-2 border">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default MultimediaManagement;
