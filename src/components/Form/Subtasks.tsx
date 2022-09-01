import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { v4 as uuid } from 'uuid';
import { Subtask } from "../../models/subtask";

interface SubtasksProps {
  initialValues: Subtask[]
}
const Subtasks = ({ initialValues }: SubtasksProps) => {
  return (
    <Form.List name="subtasks" initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              id="subtask-group"
              style={{ display: "flex", alignItems: "baseline" }}
              key={key}
            >
              <Form.Item 
                {...restField}
                name={[name, "isComplete"]}
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "todo"]}
                rules={[{ required: true, message: "Missing todo" }]}
              >
                <Input bordered={false} placeholder="EX. Read chapter 5" />
              </Form.Item>
              <Form.Item
                name={[name, "id"]}
                initialValue={uuid()}
              >
                <Input hidden />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add todo
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default Subtasks;
