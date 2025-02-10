import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import { Mark } from '@tiptap/core' 
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Link2,
  Plus,
  Minus
} from 'lucide-react';

// Custom extension for font size
const FontSize = Mark.create({
    name: 'fontSize',
  
    addAttributes() {
      return {
        size: {
          default: 'normal',
          parseHTML: element => element.style.fontSize || 'normal',
          renderHTML: attributes => {
            if (!attributes.size || attributes.size === 'normal') {
              return {}
            }
            return {
              style: `font-size: ${attributes.size}`
            }
          },
        },
      }
    },
  
    parseHTML() {
      return [
        {
          style: 'font-size',
        },
      ]
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['span', HTMLAttributes, 0]
    },
  
    addCommands() {
      return {
        setFontSize: size => ({ chain }) => {
          return chain()
            .setMark(this.name, { size })
            .run()
        },
        unsetFontSize: () => ({ chain }) => {
          return chain()
            .unsetMark(this.name)
            .run()
        },
      }
    },
  })
  
const Editor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
          Document,
          StarterKit.configure({
            heading: false,
            document: false,
            paragraph: false
          }),
          Paragraph.configure({
            HTMLAttributes: {
              class: 'text-base',
            },
          }),
          Text,
          TextStyle,
          FontSize,  // Make sure it's included here
          Bold.configure(),
          Italic.configure(),
          Underline.configure(),
          BulletList.configure({
            HTMLAttributes: {
              class: 'list-disc ml-4'
            }
          }),
          OrderedList.configure({
            HTMLAttributes: {
              class: 'list-decimal ml-4'
            }
          }),
          ListItem,
          TextAlign.configure({
            types: ['paragraph'],
            alignments: ['left', 'center', 'right'],
            defaultAlignment: 'left',
          })
        ],
        content: content,
        onUpdate: ({ editor }) => {
          onChange && onChange(editor.getHTML());
        },
        editorProps: {
          attributes: {
            class: 'prose max-w-none focus:outline-none min-h-[300px]'
          }
        }
      });

      const increaseFontSize = () => {
        if (!editor) return;
        
        const currentSize = editor.getAttributes('fontSize').size;
        let newSize;
        
        if (!currentSize || currentSize === 'normal') {
          newSize = '1.2em';
        } else {
          const currentEm = parseFloat(currentSize);
          newSize = `${(currentEm + 0.2).toFixed(1)}em`;
        }
        
        editor.chain().focus().setFontSize(newSize).run();
      };
      
      const decreaseFontSize = () => {
        if (!editor) return;
        
        const currentSize = editor.getAttributes('fontSize').size;
        let newSize;
        
        if (!currentSize || currentSize === 'normal') {
          newSize = '0.8em';
        } else {
          const currentEm = parseFloat(currentSize);
          if (currentEm <= 0.8) return;
          newSize = `${(currentEm - 0.2).toFixed(1)}em`;
        }
        
        editor.chain().focus().setFontSize(newSize).run();
      };

  if (!editor) return null;

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex items-center gap-2 border-b pb-4 mb-4 min-w-max md:min-w-0">
          <div className="flex items-center border-l pl-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                editor.isActive('bold') ? 'bg-gray-200' : ''
              }`}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                editor.isActive('italic') ? 'bg-gray-200' : ''
              }`}
            >
              <em>I</em>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                editor.isActive('underline') ? 'bg-gray-200' : ''
              }`}
            >
              <u>U</u>
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center border-l pl-2">
            <button
              onClick={increaseFontSize}
              className="p-1.5 rounded hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={decreaseFontSize}
              className="p-1.5 rounded hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center border-l pl-2">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center border-l pl-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive('bulletList') ? 'bg-gray-200' : ''
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive('orderedList') ? 'bg-gray-200' : ''
              }`}
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center border-l pl-2">
            <button
              onClick={() => {
                const url = window.prompt('Enter the URL:')
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run()
                }
              }}
              className={`p-1.5 rounded hover:bg-gray-100 ${
                editor.isActive('link') ? 'bg-gray-200' : ''
              }`}
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <EditorContent editor={editor} className="prose prose-sm sm:prose-base lg:prose-lg max-w-none min-h-[300px] text-sm md:text-base" />
    </div>
  );
};

export default Editor;