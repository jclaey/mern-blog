import { useEffect, useRef } from "react"

const Editor = ({ value, onChange }) => {
  const editorRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      if (window.tinymce) {
        window.tinymce.init({
          selector: "#editor",
          height: 400,
          width: "100%",
          menubar: false,
          plugins: "advlist autolink lists link image charmap preview anchor insertdatetime",
          toolbar:
            "undo redo | fontsize | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | image link insertdatetime | removeformat",
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
          content_css: "https://cdn.tiny.cloud/1/gpcfinmpmsaqqlj61u93b2k1jce8onblj0nybpb9ti64jvmu/tinymce/6/tinymce.min.js",
          setup: (editor) => {
            editorRef.current = editor
            editor.on("change", () => {
              onChange(editor.getContent())
            })
          },
        })

        initialized.current = true
      }
    }

    return () => {
      if (window.tinymce) {
        window.tinymce.remove("#editor")
      }
    }
  }, [])

  return <textarea id="editor" defaultValue={value}></textarea>
}

export default Editor