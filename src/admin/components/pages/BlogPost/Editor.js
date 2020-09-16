import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export const Editor = ({placeholder, value, onChange}) => {


  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'#root'}
        placeholder={placeholder}
      />
    </div>
  )
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
}
