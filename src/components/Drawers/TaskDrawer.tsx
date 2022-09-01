import React, { useEffect } from "react";
import { Button, Checkbox, Drawer, Form, Input, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Task } from "../../models/task";

// -------
//  adding notes in future
// -----

interface TaskDrawerProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: TaskDrawerValues) => void;
  task: Task | undefined;
}

export interface TaskDrawerValues {
  label: string,
  task: string,
  completed: boolean
}

const TaskDrawer = ({ visible, onClose, onUpdate, task }: TaskDrawerProps) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form?.resetFields()
  }, [task, form]);
  
  const onOk = () => {
    form.validateFields()
    .then((values: TaskDrawerValues) => {
      form.resetFields();
      onUpdate(values);
    })
    .catch(console.error)
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  }

  return (
    <Drawer
      title="Modify task"
      placement="right"
      width={500}
      onClose={handleClose}
      visible={visible}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={onOk}>
            Save
          </Button>
        </Space>
      }
    >
      {task ? (
        <>
          <Form
            form={form}
            layout="vertical"
            name="updateTaskForm"
            initialValues={{ label: task.label, task: task.task }}
          >
            <Form.Item name="completed" valuePropName="checked">
              <Checkbox>Is Completed ?</Checkbox>
            </Form.Item>
            <Form.Item
            style={{ margin: 0 }}
              name="label"
              rules={[
                {
                  required: true,
                  message: "Please add a label",
                },
              ]}
            >
              <Input style={{ color: "#53576D"}} bordered={false} placeholder="Label here" />
            </Form.Item>

            <Form.Item name="task" rules={[
                {
                  required: true,
                  message: "Please add a task",
                },
              ]}>
              <TextArea
                style={{ fontSize: 36, fontWeight: 600, color: "#53576D" }}
                bordered={false}
                placeholder="Task here"
              />
            </Form.Item>
          </Form>
        </>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default TaskDrawer;
