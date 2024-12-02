import { useEffect, useRef } from 'react';

const QuillTextEditor = ({ value }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill only once
  useEffect(() => {
    const initializeQuill = async () => {
      if (editorRef.current && !quillRef.current) {
        const Quill = (await import('quill')).default;

        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          readOnly: true,
          modules: {
            toolbar: null,
          },
        });

        // Set initial content
        if (value) {
          quillRef.current.clipboard.dangerouslyPasteHTML(value);
        }
      }
    };

    initializeQuill();
  }, []); // Empty dependency array ensures this runs once

  // Update editor content when `value` changes
  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      if (quillRef.current.root.innerHTML !== value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value]); // Runs when `value` changes

  return <div className='text-editor-div' ref={editorRef} />;
};

export default QuillTextEditor;
