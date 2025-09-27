import React, { useState, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
} from "lucide-react";
import { CategoryAPI, NewsAPI } from "../src/services/api";
import { toast } from "react-hot-toast";
import AdminLayout from "../src/components/AdminLayout/Layout";

export default function AddNewPost() {
  const [title, setTitle] = useState("");
  const [currentBlock, setCurrentBlock] = useState("p");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  }, [title]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }), // disable default heading
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link.configure({ openOnClick: true, linkOnPaste: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Write your blog here...</p>",
    onUpdate({ editor }) {
      if (editor.isActive("heading", { level: 1 })) setCurrentBlock("1");
      else if (editor.isActive("heading", { level: 2 })) setCurrentBlock("2");
      else if (editor.isActive("heading", { level: 3 })) setCurrentBlock("3");
      else setCurrentBlock("p");
    },
  });

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
      formData.append("content", editor.getHTML());
      formData.append("status", status);
      formData.append("is_highlight", highlight ? 1 : 0);
      selectedCategories.forEach((catId) =>
        formData.append("category_ids[]", catId)
      );

      await NewsAPI.create(formData);
      toast.success("News published successfully!");
      setTitle("");
      editor.commands.clearContent();
      setSelectedCategories([]);
      setHighlight(false);
    } catch (err) {
      console.error("Failed to publish news", err);
      toast.error("Failed to publish news");
    }
  };

  if (!editor) return null;

  return (
    <AdminLayout className="w-[80%] bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-1">
      <h1 className="text-2xl font-bold">Add News</h1>
      <div className="bg-white rounded-2xl flex w-full">
        {/* Left Section */}
        <div className="flex-1 border-gray-200">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add New Post Title"
            className="w-full border border-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-600 rounded-lg p-3 text-xl font-semibold mb-4 outline-none transition"
          />

          {/* Slug */}
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full border border-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-600 rounded-lg p-2 text-sm mb-4 outline-none transition"
          />

          {/* Add Media */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 shadow transition"
            >
              + Add Media
            </button>

            {mediaFile && (
              <span className="text-sm text-gray-700 font-medium">
                {mediaFile.name}
              </span>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0])
                  setMediaFile(e.target.files[0]);
              }}
              className="hidden"
            />
          </div>

          {/* Toolbar */}
          <div className="border border-gray-200 rounded-lg p-3 shadow-sm mb-4">
            <div className="flex flex-wrap gap-2 mb-3 items-center">
              {/* Block Type Dropdown */}
              <select
                onChange={(e) => {
                  const level = e.target.value;
                  if (level === "p")
                    editor.chain().focus().setParagraph().run();
                  else
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: parseInt(level) })
                      .run();
                }}
                value={currentBlock}
                className="border border-yellow-600 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-yellow-400 transition"
              >
                <option value="p">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>

              {/* Inline Marks */}
              {[
                ["bold", BoldIcon],
                ["italic", ItalicIcon],
                ["underline", UnderlineIcon],
              ].map(([action, Icon]) => (
                <button
                  key={action}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      [
                        `toggle${
                          action.charAt(0).toUpperCase() + action.slice(1)
                        }`
                      ]()
                      .run()
                  }
                  className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                    editor.isActive(action) ? "bg-yellow-200" : "bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-yellow-600" />
                </button>
              ))}

              {/* Lists */}
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 border rounded-lg ${
                  editor.isActive("bulletList") ? "bg-yellow-200" : "bg-white"
                }`}
              >
                <List className="w-4 h-4 text-yellow-600" />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 border rounded-lg ${
                  editor.isActive("orderedList") ? "bg-yellow-200" : "bg-white"
                }`}
              >
                <ListOrdered className="w-4 h-4 text-yellow-600" />
              </button>

              {/* Align */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                  editor.isActive({ textAlign: "left" })
                    ? "bg-yellow-200"
                    : "bg-white"
                }`}
              >
                <AlignLeft className="w-4 h-4 text-yellow-600" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                  editor.isActive({ textAlign: "center" })
                    ? "bg-yellow-200"
                    : "bg-white"
                }`}
              >
                <AlignCenter className="w-4 h-4 text-yellow-600" />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                  editor.isActive({ textAlign: "right" })
                    ? "bg-yellow-200"
                    : "bg-white"
                }`}
              >
                <AlignRight className="w-4 h-4 text-yellow-600" />
              </button>

              {/* Quote & Code */}
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                  editor.isActive("blockquote") ? "bg-yellow-200" : "bg-white"
                }`}
              >
                <Quote className="w-4 h-4 text-yellow-600" />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 border rounded-lg hover:bg-yellow-100 transition ${
                  editor.isActive("codeBlock") ? "bg-yellow-200" : "bg-white"
                }`}
              >
                <Code className="w-4 h-4 text-yellow-600" />
              </button>
            </div>
            <div className="tiptap-editor border p-4 rounded">
              <EditorContent
                editor={editor}
                className="tiptap min-h-[250px] p-4 border border-gray-200 rounded-lg focus:outline-yellow-400 focus:ring-1 transition"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] p-6 space-y-6 bg-gray-10">
          {/* Categories */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2 text-yellow-600">Categories</h3>
            <div className="space-y-2 text-sm">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => setSelectedCategories([cat.id])}
                    className="accent-yellow-600"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          {/* Publish Box */}
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
                onClick={handlePublish}
                className="bg-yellow-600 text-white px-5 py-2 rounded-lg hover:bg-yellow-500 shadow transition"
              >
                Publish
              </button>
            </div>
          </div>

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
