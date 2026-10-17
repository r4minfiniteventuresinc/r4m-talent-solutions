import React, { useRef, useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder = 'Enter details...', minHeight = '130px' }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCmd = (command, val = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = prompt('Enter link URL (e.g. https://example.com):');
    if (url) {
      const validUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
      executeCmd('createLink', validUrl);
    }
  };

  return (
    <div className="r4m-rich-editor">
      <div className="r4m-rich-editor__toolbar">
        <button
          type="button"
          className="r4m-rich-tool-btn"
          onClick={() => executeCmd('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="r4m-rich-tool-btn"
          onClick={() => executeCmd('italic')}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <span className="r4m-rich-tool-divider"></span>
        <button
          type="button"
          className="r4m-rich-tool-btn"
          onClick={() => executeCmd('insertUnorderedList')}
          title="Bullet List"
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          type="button"
          className="r4m-rich-tool-btn"
          onClick={() => executeCmd('insertOrderedList')}
          title="Numbered List"
        >
          <i className="bi bi-list-ol"></i>
        </button>
        <span className="r4m-rich-tool-divider"></span>
        <button
          type="button"
          className="r4m-rich-tool-btn"
          onClick={handleLink}
          title="Insert Hyperlink"
        >
          <i className="bi bi-link-45deg"></i>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="r4m-rich-editor__content"
        style={{ minHeight }}
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  );
}
