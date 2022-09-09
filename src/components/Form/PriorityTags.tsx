import React from "react";
import { Tag } from "antd";

import "./PriorityTags.css";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

const PriorityTags = ({ value = 0, onChange }: Props) => {
  const tagsData = ["Low", "High"];
  const { CheckableTag } = Tag;
  
  const checkedStyle = ["priority-tag-low", "priority-tag-high"];

  const handleOnChange = (index: number) => {
    onChange?.(index);
  };

  return (
    <div>
        <span style={{ marginRight: 10 }}>Priority</span>
      {tagsData.map((tag, index) => (
        <CheckableTag
          className={checkedStyle[value]}
          key={tag}
          checked={value === index ? true : false}
          onChange={() => handleOnChange(index)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
};

export default PriorityTags;
