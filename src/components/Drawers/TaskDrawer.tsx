import React, { useEffect } from "react";
import { Button, Checkbox, Drawer, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Task } from "../../models/task";

// -------
//  adding notes in future
// -----
interface TaskDrawerProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: Task) => void;
  task: Task | undefined;
}

const TaskDrawer = ({ visible, onClose, onUpdate, task }: TaskDrawerProps) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form?.resetFields()
  }, [task, form]);
  
  const onOk = () => {
    form.validateFields()
    .then((values: Task) => {
      onUpdate({...values, id: task?.id as string, dateId: task?.dateId as string});
      form.resetFields();
    })
    .catch(console.error)
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
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
            initialValues={{ label: task.label, task: task.task, isComplete: task.isComplete }}
          >
            <Form.Item name="isComplete" valuePropName="checked">
              <Checkbox>Mark as completed</Checkbox>
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin />
        </div>
      )}
    </Drawer>
  );
};

export default TaskDrawer;
