import { Button } from "antd";
import React from "react";

interface CreateHallCardBtnProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateHallCardBtn = ({ setVisible }: CreateHallCardBtnProps) => {
  return (
    <Button
      className="ant-btn-primary"
      onClick={() => setVisible(true)}
    >
        Create new plan
    </Button>
  );
};

export default CreateHallCardBtn;
