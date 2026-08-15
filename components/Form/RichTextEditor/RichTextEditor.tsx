'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor,  useEditorState, } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import css from './RichTextEditor.module.css';

interface RichTextEditorProps {
    value: string;
    hasError?: boolean;
    onChange: (html: string, text: string) => void;
    onBlur?: () => void;
}

const RichTextEditor = ({
    value,
    hasError = false,
    onChange,
    onBlur,
}: RichTextEditorProps) => {
    const editor = useEditor({
        // 
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Enter a text',
            }),
        ],
        content: value,
        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: css.editor,
                'aria-label': 'Article text',
            },
        },
        
        onUpdate: ({ editor: currentEditor }) => {
            onChange(
                currentEditor.getHTML(),
                currentEditor.getText({
                blockSeparator: '\n\n',
                }),
            );
        },

        onBlur: () => {
            onBlur?.();
        },
    });
    
    const historyState = useEditorState({
        editor,
        selector: ({ editor: currentEditor }) => ({
            canUndo:
                currentEditor
                    ?.can()
                    .chain()
                    .undo()
                    .run() ?? false,
            
            canRedo:
                currentEditor
                    ?.can()
                    .chain()
                    .redo()
                    .run() ?? false,
        }),
    });

    const canUndo = historyState?.canUndo ?? false;
    const canRedo = historyState?.canRedo ?? false;
    
    useEffect(() => {
        if (!editor || editor.getHTML() === value) {
            return;
        }
        
        editor.commands.setContent(value || '', {
            emitUpdate: false,
        });
    }, [editor, value]);
        
    if (!editor) {
        return (
            <div
                className={css.loading}
                aria-busy="true"
                aria-label="Loading article editor"
            />
        );
    }
    
    const buttonClassName = (isActive = false) => `${css.toolbarButton} ${isActive ? css.active : ''}`;
    
    return (
        <div
            className={`${css.wrapper} ${hasError ? css.error : ''}`}
        >
            <div
                className={css.toolbar}
                role="toolbar"
                aria-label="Article formatting"
            >
                <button
                    type="button"
                    className={buttonClassName(editor.isActive('bold'))}
                    aria-label="Bold"
                    aria-pressed={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    B
                </button>
                
                <button
                    type="button"
                    className={buttonClassName(editor.isActive('italic'))}
                    aria-label="Italic"
                    aria-pressed={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    I
                </button>
                
                <button
                    type="button"
                    className={buttonClassName(
                        editor.isActive('heading', { level: 2 }),
                    )}
                    aria-label="Heading"
                    aria-pressed={editor.isActive('heading', {
                        level: 2,
                    })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </button>


                <button
                    type="button"
                    className={buttonClassName(
                        editor.isActive('bulletList'),
                    )}
                    aria-label="Bullet list"
                    aria-pressed={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    • List
                </button>
                
                <button
                    type="button"
                    className={buttonClassName(
                        editor.isActive('orderedList'),
                    )}
                    aria-label="Numbered list"
                    aria-pressed={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    1. List
                </button>

                <button
                    type="button"
                    className={buttonClassName(
                        editor.isActive('blockquote'),
                    )}
                    aria-label="Quote"
                    aria-pressed={editor.isActive('blockquote')}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    Quote
                </button>
                
                <button
                    type="button"
                    className={css.toolbarButton}
                    aria-label="Undo"
                    disabled={!canUndo}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    ↶
                </button>
                
                <button
                    type="button"
                    className={css.toolbarButton}
                    aria-label="Redo"
                    disabled={!canRedo}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    ↷
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;