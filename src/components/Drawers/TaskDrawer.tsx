import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Space,
  Spin,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Task } from "../../models/task";
import Subtasks from "../Form/Subtasks";
import PriorityTags from "../Form/PriorityTags";
import { Subtask } from "../../models/subtask";

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
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(() => {
    form?.resetFields();
  }, [task, form]);

  const onOk = () => {
    form
      .validateFields()
      .then((values: Task) => {
        const subtasks = values.subtasks;
        const stLength = subtasks.length;
        const stCompletedLength = subtasks.filter(
          (subtask) => subtask.isComplete === true
        ).length;
        const stProgress = stCompletedLength / stLength;
        onUpdate({
          ...values,
          id: task?.id as string,
          dateId: task?.dateId as string,
          subtasksCount: stLength,
          subtasksCompletedCount: stCompletedLength,
          progress: stProgress,
        });

        form.resetFields();
      })
      .catch(console.error);
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpenConfirm(newOpen);
      return;
    }

    const taskDone = form.getFieldValue("isComplete") as boolean;
    const subtasks = form.getFieldValue("subtasks") as Subtask[];
    const truthies = subtasks.filter(
      (subtask) => subtask.isComplete === true
    ).length;
    const allSubtasksCompleted = truthies === subtasks.length;
    const condition = allSubtasksCompleted && !taskDone ? true : false;

    if (!condition) {
      onOk();
    } else {
      setOpenConfirm(newOpen);
    }
  };

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
          <Popconfirm
            style={{ padding: "3px" }}
            placement="bottomRight"
            title="Do you want to mark this task as done?"
            onConfirm={() => {
              form.setFieldValue("isComplete", true);
              onOk();
            }}
            onCancel={() => {
              setOpenConfirm(false);
              onOk();
            }}
            okText="Yes"
            cancelText="No"
            onVisibleChange={handleOpenChange}
            visible={openConfirm}
          >
            <Button type="primary">Save</Button>
          </Popconfirm>
        </Space>
      }
    >
      {task ? (
        <>
          <Form
            form={form}
            layout="vertical"
            name="updateTaskForm"
            initialValues={{
              label: task.label,
              task: task.task,
              isComplete: task.isComplete,
              priority: task.priority,
            }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingInline: 10,
              }}
            >
              <Form.Item name="priority">
                <PriorityTags />
              </Form.Item>
              <Form.Item name="isComplete" valuePropName="checked">
                <Checkbox>Mark as done</Checkbox>
              </Form.Item>
            </Space>
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
              <Input
                style={{ color: "#53576D" }}
                bordered={false}
                placeholder="Label here"
              />
            </Form.Item>
            <Form.Item
              name="task"
              rules={[
                {
                  required: true,
                  message: "Please add a task",
                },
              ]}
            >
              <TextArea
                style={{ fontSize: 36, fontWeight: 600, color: "#53576D" }}
                bordered={false}
                placeholder="Task here"
              />
            </Form.Item>
            <Subtasks initialValues={task.subtasks} />
          </Form>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      )}
    </Drawer>
  );
};

export default TaskDrawer;
