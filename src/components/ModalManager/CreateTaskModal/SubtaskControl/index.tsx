import React, { useEffect, useRef, useState } from 'react';
import {
  CloseCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Input,
  InputRef,
  Space,
  Tag,
  Tooltip,
  theme,
} from 'antd';
import './SubtaskControlStyles.css';

interface SubtaskControlProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const SubtaskControl: React.FC<SubtaskControlProps> = ({
  value = [],
  onChange,
}) => {
  const { token } = theme.useToken();
  // todo: to change
  const [tags, setTags] = useState<string[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    onChange?.(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      onChange?.([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    onChange?.(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 'fit-content',
    maxWidth: 150,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
  };
  return (
    <Space direction='vertical' className='py-3' size={[0, 8]} wrap>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size='small'
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 35;
        const tagElem = (
          <Space className='rounded hover:bg-selectedTextLight subtaskContainer'>
            <Checkbox className='text-xs' key={tag} onChange={() => {}}>
              {isLongTag ? `${tag.slice(0, 35)}...` : tag}
            </Checkbox>
            <Space id='subtaskModifiers'>
              <Button
                onClick={(e) => {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }}
                type='text'
                icon={<EditOutlined />}
                size={'small'}
              />
              <Button
                type='text'
                icon={<CloseCircleOutlined />}
                size={'small'}
                onClick={() => handleClose(tag)}
              />
            </Space>
          </Space>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type='text'
          size='small'
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag
          className='p-0 text-xs text-textLight cursor-pointer'
          style={tagPlusStyle}
          bordered={false}
          icon={<PlusOutlined />}
          onClick={showInput}>
          New subtask
        </Tag>
      )}
    </Space>
  );
};

export default SubtaskControl;
