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

export default function EditorToolbar({ editor, currentBlock, setCurrentBlock }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 items-center">
      {/* Block Type Dropdown */}
      <select
        value={currentBlock}
        onChange={(e) => {
          const level = e.target.value;
          if (level === "p") editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
        }}
        className="border rounded p-2 text-sm"
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
          onClick={() => editor.chain().focus()[`toggle${action[0].toUpperCase() + action.slice(1)}`]().run()}
          className={`p-2 border rounded ${editor.isActive(action) ? "bg-yellow-200" : ""}`}
        >
          <Icon className="w-4 h-4 text-yellow-600" />
        </button>
      ))}

      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 border rounded">
        <List className="w-4 h-4 text-yellow-600" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 border rounded">
        <ListOrdered className="w-4 h-4 text-yellow-600" />
      </button>

      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="p-2 border rounded">
        <AlignLeft className="w-4 h-4 text-yellow-600" />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="p-2 border rounded">
        <AlignCenter className="w-4 h-4 text-yellow-600" />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="p-2 border rounded">
        <AlignRight className="w-4 h-4 text-yellow-600" />
      </button>

      {/* Quote & Code */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="p-2 border rounded">
        <Quote className="w-4 h-4 text-yellow-600" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="p-2 border rounded">
        <Code className="w-4 h-4 text-yellow-600" />
      </button>
    </div>
  );
}
