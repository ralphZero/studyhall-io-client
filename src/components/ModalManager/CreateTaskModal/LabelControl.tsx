import { PlusOutlined } from '@ant-design/icons';
import { theme, InputRef, Space, Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface Label {
  color: string;
  label: string;
}
interface LabelControlProps {
  value?: Label[];
  onChange?: (value: Label[]) => void;
}

const LabelControl: React.FC<LabelControlProps> = ({
  value = [],
  onChange,
}) => {
  const { token } = theme.useToken();
  // todo: to change
  const [tags, setTags] = useState<Label[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const colorList = [
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

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

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag.label !== removedTag);
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
    if (
      inputValue &&
      tags.findIndex((tag) => tag.label === inputValue) === -1
    ) {
      const newTags = [...tags, { label: inputValue, color: getRandomColor() }];
      setTags(newTags);
      onChange?.(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex].label = editInputValue;
    setTags(newTags);
    onChange?.(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  const getRandomColor = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  return (
    <Space size={[0, 8]} wrap>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag.label}
              size='small'
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.label.length > 20;
        const tagElem = (
          <Tag
            color={tag.color}
            bordered={false}
            key={tag.label}
            closable={true}
            style={{ userSelect: 'none' }}
            onClose={() => handleClose(tag.label)}>
            <span
              onDoubleClick={(e) => {
                setEditInputIndex(index);
                setEditInputValue(tag.label);
                e.preventDefault();
              }}>
              {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.label} key={tag.label}>
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
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New label
        </Tag>
      )}
    </Space>
  );
};

export default LabelControl;
