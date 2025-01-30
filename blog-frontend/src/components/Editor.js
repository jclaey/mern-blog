import { useEffect, useRef } from "react"

const Editor = ({ value, onChange }) => {
    const editorRef = useRef(null)

    useEffect(() => {
        if (window.tinymce) {
          window.tinymce.init({
            selector: "#editor",
            height: 400,
            width: "100%",
            menubar: false,
            resize: "both",
            plugins: "advlist lists link image charmap preview anchor code",
            toolbar:
              "undo redo | formatselect | blocks | hr | strikethrough underline bold italic | \
              bullist numlist | removeformat",
            setup: (editor) => {
              editorRef.current = editor
              editor.setContent(value || "")
              editor.on("input change keyup", () => {
                onChange(editor.getContent())
              })
            },
          })
        }
    
        return () => {
          if (window.tinymce) {
            window.tinymce.remove("#editor")
          }
        }
    }, [value])

    return <textarea id="editor" defaultValue={value}></textarea>
}

export default Editor