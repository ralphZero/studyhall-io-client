import React from "react";
import { Moment} from 'moment';
import { Form, Input, Modal, DatePicker } from "antd";

export interface Values {
  title: string;
  description: string;
  timeframe: Moment[];
}

interface CreateHallModalProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CreateHallModal = ({
  visible,
  onCancel,
  onCreate,
}: CreateHallModalProps) => {

  const [form] = Form.useForm();

  const onOk = () => {
    form.validateFields()
    .then((values: Values )=> {
        // form.resetFields();
        onCreate(values);
    }).catch(info => console.error("validate failed", info));
  };

  const { RangePicker } = DatePicker;
  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select a timeframe!' }],
  };

  return (
    <>
      <Modal
        title="Create study plan"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        cancelText="Cancel"
        okText="Create"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="timeframe" label="Timeframe" {...rangeConfig}>
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateHallModal;
