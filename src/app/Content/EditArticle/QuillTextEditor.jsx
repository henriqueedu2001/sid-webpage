import { useEffect, useRef } from 'react';

const QuillTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill only once
  useEffect(() => {
    const initializeQuill = async () => {
      if (editorRef.current && !quillRef.current) {
        const Quill = (await import('quill')).default;


        const toolbarOptions = [
          [{ 'font': [] }],
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['clean']
        ];

        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: placeholder,
          modules: {
            toolbar: toolbarOptions,
          },
        });

        quillRef.current.on('text-change', () => {
          const html = editorRef.current.children[0].innerHTML;
          onChange(html);
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
