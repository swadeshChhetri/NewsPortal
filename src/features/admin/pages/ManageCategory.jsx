// src/pages/admin/CategoriesManagement.jsx
import React, { useState, useEffect } from "react";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import { CategoryAPI } from "../../../services/api";
import AdminLayout from "../../../components/layout/AdminLayout";
import toast from "react-hot-toast";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    name: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await CategoryAPI.fetchAll();
        setCategories(data.categories);
      } catch (err) {
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Auto-generate slug
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let updatedForm = { ...form, [name]: value };
  //   if (name === "name" && !form.slug) {
  //     updatedForm.slug = generateSlug(value);
  //   }
  //   setForm(updatedForm);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "name") {
        // auto-generate only if user hasn't typed a custom slug.
        // We treat the slug as "unmodified" if it's empty,
        // or it exactly matches the slug for the previous name.
        const prevSlug = prev.slug || "";
        const prevNameSlug = generateSlug(prev.name || "");
        const userDidNotEditSlug = !prevSlug || prevSlug === prevNameSlug;

        if (userDidNotEditSlug) {
          next.slug = generateSlug(value);
        }
      }

      return next;
    });
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Category name is required!");
      return;
    }

    try {
      if (form._id) {
        // Update category
        const updated = await CategoryAPI.update(form._id, form);
        setCategories(
          categories.map((c) => (c._id === form._id ? updated : c))
        );
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        const created = await CategoryAPI.create(form);
        setCategories([...categories, created]);
        toast.success("Category created successfully!");
      }
      setForm({ _id: null, name: "", slug: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save category.");
    }
  };

  const handleEdit = (cat) => {
    setForm({
      _id: cat._id ?? null,
      name: cat.name ?? "",
      slug: cat.slug ?? generateSlug(cat.name ?? ""),
      description: cat.description ?? "",
    });
  };

  const handleDelete = async (_id) => {
    const cat = categories.find((c) => c._id === _id);
    if (cat?.name === "Uncategorized") {
      toast.error("Default category cannot be deleted!");
      return;
    }
    try {
      await CategoryAPI.delete(_id);
      setCategories(categories.filter((c) => c._id !== _id));
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category.");
    }
  };

  const handleBulkDelete = async () => {
    if (selected.length === 0) return;
    try {
      await Promise.all(selected.map((_id) => deleteCategory(_id)));
      setCategories(categories.filter((c) => !selected.includes(c._id)));
      setSelected([]);
      toast.success("Selected categories deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete selected categories.");
    }
  };

  const filteredCategories = (categories || []).filter((c) =>
    (c?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <SpinnerLoader size={60} color="yellow-500" />;
  }

 

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
      </div>

      {/* Search + Bulk Actions */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        {selected.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete Selected ({selected.length})
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">
          {form._id ? "Edit Category" : "Add Category"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="auto-generated from name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
              placeholder="Enter category description"
            ></textarea>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {form._id ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? categories.map((c) => c._id) : []
                    )
                  }
                  checked={
                    categories.length > 0 &&
                    selected.length === categories.length
                  }
                />
              </th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(cat._id)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, cat._id]
                          : selected.filter((_id) => _id !== cat._id)
                      )
                    }
                  />
                </td>
                <td className="px-4 py-3">{cat._id}</td>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3">{cat.slug}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr key="no-data">
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default CategoriesManagement;
