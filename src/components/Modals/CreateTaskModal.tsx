import { Form, Input, Modal } from "antd";
import React from "react";

export interface Values {
  label: string;
  task: string;
}

interface CreateTaskModalProps {
  visible: boolean;
  isLoading: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CreateTaskModal = ({
  visible,
  onCreate,
  onCancel,
  isLoading,
}: CreateTaskModalProps) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values: Values) => {
        onCreate(values);
        form.resetFields();
      })
      .catch((info) => console.error("validate failed", info));
  };

  const handleCancel = () => {
    form?.resetFields();
    onCancel();
  }

  return (
    <Modal
      
      title="Create a task"
      visible={visible}
      onOk={onOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      cancelText="Cancel"
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="label"
          label="Label"
          rules={[
            {
              required: true,
              message: "Please add a task.",
            },
          ]}
        >
          <Input placeholder="Ex: Javascript" />
        </Form.Item>
        <Form.Item
          name="task"
          label="Task"
          rules={[
            {
              required: true,
              message: "Please add a task.",
            },
          ]}
        >
          <Input placeholder="Ex: Study array methods"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
