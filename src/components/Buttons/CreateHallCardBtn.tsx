import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface CreateHallCardBtnProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateHallCardBtn = ({ setVisible }: CreateHallCardBtnProps) => {
  return (
    <Button
      style={{
        height: "100%",
        backgroundColor: "#F2F2F2",
        color: "#BDBDBD",
      }}
      block
      onClick={() => setVisible(true)}
    >
        <PlusOutlined size={46} />
    </Button>
  );
};

export default CreateHallCardBtn;
