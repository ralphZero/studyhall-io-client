import React, { useState } from 'react';
import { Card } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './DescriptionEditorStyles.css';

export const DescriptionEditor = () => {
  const [editorState, setEditorState] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
    ],
  };

  const formats = [
    'header',
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
  ];

  return (
    <Card
      bordered={false}
      style={{ boxShadow: 'none', paddingTop: '0px' }}
      className='mt-3 bg-primaryWhite [&_.ant-card-body]:p-0'
      size='small'>
      <ReactQuill
        value={editorState}
        onChange={(value) => setEditorState(value)}
        modules={modules}
        formats={formats}
      />
    </Card>
  );
};
