import React, { useState, useEffect, useRef } from "react";
import { CategoryAPI, NewsAPI } from "../../../services/api";
import { toast } from "react-hot-toast";
import AdminLayout from './../../../components/layout/AdminLayout';
import RichTextEditor from "./RichTextEditor";
import MediaUploader from "./MediaUploader";
import CategorySelector from "./CategorySelector";
import PublishBox from "./PublishBox";

export default function AddNewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p>Write your blog here...</p>");
  const [currentBlock, setCurrentBlock] = useState("p");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [status, setStatus] = useState("draft");

  // Generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [title]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await CategoryAPI.fetchAll();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);


  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("status", status);
      formData.append("is_highlight", highlight ? 1 : 0);
  
      // single category for now
      if (selectedCategories.length > 0) {
        formData.append("category_id", selectedCategories[0]);
      }else {
        // fallback dummy category for testing
        formData.append("category_id", "1"); 
      }
  
      // match backend field name
      if (mediaFile) {
        formData.append("image", mediaFile);
      }
  
      // add required author_id
      formData.append("author_id", 1);
  
      await NewsAPI.create(formData);
      toast.success("News published successfully!");
      // reset form...
    } catch (err) {
      console.error("Failed to publish news", err);
      toast.error("Failed to publish news");
    }
  };

  
  return (
    <AdminLayout className="w-[80%] bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-1">
      <h1 className="text-2xl font-bold">Add News</h1>
      <div className="bg-white rounded-2xl flex w-full">
        {/* Left Section */}
        <div className="flex-1 border-gray-200 p-6">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add New Post Title"
            className="w-full border border-yellow-600 rounded-lg p-3 text-xl font-semibold mb-4 outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          {/* Slug */}
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full border border-yellow-600 rounded-lg p-2 text-sm mb-4 outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          {/* Media uploader */}
          <MediaUploader
            fileInputRef={fileInputRef}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
          />

          {/* Rich Text Editor */}
          <RichTextEditor
            content={content}
            onChange={setContent}
            currentBlock={currentBlock}
            setCurrentBlock={setCurrentBlock}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] p-6 space-y-6 bg-gray-50">
          <CategorySelector
            categories={categories || []} 
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <PublishBox
            status={status}
            setStatus={setStatus}
            onPublish={handlePublish}
          />

          <label className="flex gap-2 text-sm items-center mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="accent-yellow-600"
            />
            Highlight
          </label>
        </div>
      </div>
    </AdminLayout>
  );
}
