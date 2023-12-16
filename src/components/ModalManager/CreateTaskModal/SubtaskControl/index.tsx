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
import { v4 as getRandomId } from 'uuid';
import './SubtaskControlStyles.css';

interface Subtask {
  label: string;
  checked: boolean;
  id: string;
}
interface SubtaskControlProps {
  value?: Subtask[];
  onChange?: (value: Subtask[]) => void;
}

const SubtaskControl: React.FC<SubtaskControlProps> = ({
  value = [],
  onChange,
}) => {
  const { token } = theme.useToken();
  // todo: to change
  const [tags, setTags] = useState<Subtask[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (tags.length === 0 && value.length > 0) {
      setTags(value);
    }
  }, [tags.length, value]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTagId: string) => {
    const newTags = tags.filter((tag) => tag.id !== removedTagId);
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
    if (inputValue) {
      const newSubTask = [
        ...tags,
        { label: inputValue, checked: false, id: getRandomId() },
      ];
      setTags(newSubTask);
      onChange?.(newSubTask);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    const index = newTags.findIndex((tag) => editInputIndex === tag.id);
    newTags[index].label = editInputValue;
    setTags(newTags);
    onChange?.(newTags);
    setEditInputIndex('');
    setEditInputValue('');
  };

  const handleCheckboxChange = (currentTodoId: string) => {
    const newTags = [...tags];
    const index = newTags.findIndex((tag) => currentTodoId === tag.id);
    newTags[index].checked = !newTags[index].checked;
    setTags(newTags);
    onChange?.(newTags);
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
        if (editInputIndex === tag.id) {
          return (
            <Input
              ref={editInputRef}
              key={tag.id + '_edit'}
              size='small'
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.label.length > 35;
        const tagElem = (
          <Space
            key={tag.id + '_container'}
            className='rounded hover:bg-selectedTextLight subtaskContainer'>
            <Checkbox
              className='text-xs'
              key={tag.id + '_check'}
              checked={tag.checked}
              onChange={(e) => {
                handleCheckboxChange(tag.id);
              }}>
              {isLongTag ? `${tag.label.slice(0, 35)}...` : tag.label}
            </Checkbox>
            <Space id='subtaskModifiers'>
              <Button
                onClick={(e) => {
                  setEditInputIndex(tag.id);
                  setEditInputValue(tag.label);
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
                onClick={() => handleClose(tag.id)}
              />
            </Space>
          </Space>
        );
        return isLongTag ? (
          <Tooltip title={tag.label} key={tag.id + '_tooltip'}>
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
