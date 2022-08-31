import { Form, Input, Modal } from "antd";
import React from "react";

export interface Values {
  label: string;
  task: string;
}

interface CreateTaskModalProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CreateTaskModal = ({
  visible,
  onCreate,
  onCancel,
}: CreateTaskModalProps) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values: Values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => console.error("validate failed", info));
  };

  return (
    <Modal
      title="Create a task"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
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
          <Input />
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
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
