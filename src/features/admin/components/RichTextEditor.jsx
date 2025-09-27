import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import EditorToolbar from "./EditorToolbar";

export default function RichTextEditor({
  content,
  onChange,
  currentBlock,
  setCurrentBlock,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link.configure({ openOnClick: true, linkOnPaste: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      if (editor.isActive("heading", { level: 1 })) setCurrentBlock("1");
      else if (editor.isActive("heading", { level: 2 })) setCurrentBlock("2");
      else if (editor.isActive("heading", { level: 3 })) setCurrentBlock("3");
      else setCurrentBlock("p");
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-3 shadow-sm">
      <EditorToolbar
        editor={editor}
        currentBlock={currentBlock}
        setCurrentBlock={setCurrentBlock}
      />
      <div className="tiptap-editor border p-4 rounded">
        <EditorContent
          editor={editor}
          className="tiptap min-h-[250px] rounded-lg"
        />
      </div>
    </div>
  );
}
