import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Pilcrow,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
} from "lucide-react";

export default function AddNewPost() {
  const [title, setTitle] = useState("");
  const [permalink, setPermalink] = useState("http://localhost/demo/840-2");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable default heading
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Underline,
      Link,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Write your blog here...</p>",
  });

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6">
      <div className="w-[1200px] bg-white shadow-md rounded-lg flex">
        {/* Left Section */}
        <div className="flex-1 p-6 border-r">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add New Post Title"
            className="w-full border border-gray-300 rounded p-2 text-xl font-semibold mb-3"
          />

          {/* Permalink */}
          <div className="text-sm text-gray-600 mb-4">
            Permalink:{" "}
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {permalink}
            </a>{" "}
            <button className="ml-2 text-blue-500 text-sm">Edit</button>
          </div>

          {/* Add Media + Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <button className="bg-gray-100 px-3 py-1 rounded border text-sm hover:bg-gray-200">
              + Add Media
            </button>
          </div>

          {/* Tiptap Editor */}
          <div className="border rounded p-2">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-2 border-b pb-2 items-center">
              {/* Paragraph / Heading Dropdown */}
              <select
                onChange={(e) => {
                  const level = e.target.value;
                  if (level === "p") {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: parseInt(level) })
                      .run();
                  }
                }}
                value={
                  editor.isActive("heading", { level: 1 })
                    ? "1"
                    : editor.isActive("heading", { level: 2 })
                    ? "2"
                    : editor.isActive("heading", { level: 3 })
                    ? "3"
                    : "p"
                }
                className="border rounded p-2 text-sm"
              >
                <option value="p">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>

              {/* Bold */}
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("bold") ? "bg-gray-300" : ""
                }`}
              >
                <BoldIcon className="w-4 h-4" />
              </button>

              {/* Italic */}
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("italic") ? "bg-gray-300" : ""
                }`}
              >
                <ItalicIcon className="w-4 h-4" />
              </button>

              {/* Underline */}
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("underline") ? "bg-gray-300" : ""
                }`}
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>

              {/* Bullet List */}
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("bulletList") ? "bg-gray-300" : ""
                }`}
              >
                <List className="w-4 h-4" />
              </button>

              {/* Ordered List */}
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("orderedList") ? "bg-gray-300" : ""
                }`}
              >
                <ListOrdered className="w-4 h-4" />
              </button>

              {/* Align Left */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
                }`}
              >
                <AlignLeft className="w-4 h-4" />
              </button>

              {/* Align Center */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
                }`}
              >
                <AlignCenter className="w-4 h-4" />
              </button>

              {/* Align Right */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
                }`}
              >
                <AlignRight className="w-4 h-4" />
              </button>

              {/* Blockquote */}
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("blockquote") ? "bg-gray-300" : ""
                }`}
              >
                <Quote className="w-4 h-4" />
              </button>

              {/* Code Block */}
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("codeBlock") ? "bg-gray-300" : ""
                }`}
              >
                <Code className="w-4 h-4" />
              </button>

              {/* Link */}
              {/* Link */}
              <button
                onClick={() => {
                  const url = window.prompt("Enter the URL"); // simple prompt to get URL
                  if (url) {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange("link")
                      .setLink({ href: url })
                      .run();
                  } else {
                    editor.chain().focus().unsetLink().run(); // remove link if canceled
                  }
                }}
                className={`p-2 border rounded hover:bg-gray-200 ${
                  editor.isActive("link") ? "bg-gray-300" : ""
                }`}
              >
                🔗
              </button>
            </div>

            {/* Editor Content */}
            <EditorContent
              editor={editor}
              className="min-h-[200px] p-2 editor-content"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] p-6 space-y-6">
          {/* Publish Box */}
          <div className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Publish</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <p>
                Status: <span className="font-medium">Draft</span>{" "}
                <button className="text-blue-500">Edit</button>
              </p>
              <p>
                Visibility: <span className="font-medium">Public</span>{" "}
                <button className="text-blue-500">Edit</button>
              </p>
              <p>
                Publish Immediately{" "}
                <button className="text-blue-500">Edit</button>
              </p>
            </div>
            <div className="flex justify-between">
              <button className="text-red-500">Move to Trash</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                Publish
              </button>
            </div>
          </div>

          {/* Format Box */}
          <div className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Format</h3>
            <select className="w-full border rounded p-2 text-sm">
              <option>Standard</option>
              <option>Aside</option>
              <option>Gallery</option>
              <option>Link</option>
              <option>Image</option>
            </select>
          </div>

          {/* Categories */}
          <div className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Blogging
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Uncategorized
              </label>
            </div>
            <button className="mt-2 text-blue-500 text-sm">
              + Add New Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
