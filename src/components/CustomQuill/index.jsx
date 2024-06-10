import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.css'

class Quill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return
    this.unhookEditor(this.editor)
  }
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

export default function CustomQuill({ text, setText }) {
  const onChange = (text) => {
    setText(text)
  }

  return (
    <Quill
      theme='snow'
      placeholder='Matnni kiriting'
      value={text}
      onChange={onChange}
      modules={modules}
    />
  )
}
