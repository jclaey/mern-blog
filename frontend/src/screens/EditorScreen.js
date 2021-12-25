/* eslint-disable no-multi-str */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorScreen = () => {
  const onEditorChange = (e) => {
    console.log(
      typeof e.target.getContent()
    );
  }

  return (
    <div>
      <Editor
        apiKey='u7jtsuz1glcmvd4obg3mihkfv74kpuhtx7qhydm5uc9j6u7e'
        onChange={onEditorChange}
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
      />
    </div>
  );
};

export default EditorScreen;
