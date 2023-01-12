import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TextEditor({ getContent }) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            getContent(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                apiKey='cjnyvqmidih1ibu4uanj0t7dvmpftlxxeipgvofzsjy3pgj8'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Add a short bio...</p>"
                init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Poppins,sans-serif; font-size:14px; }'
                }}
                onChange={log}
                // style={{backgroundColor: 'var(--sidebar-color}'}}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}

export default TextEditor