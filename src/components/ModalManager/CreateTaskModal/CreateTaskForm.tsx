import React, { FC } from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
} from 'antd';
import PriorityControl from './PriorityControl';
import DeadlineControl from './DeadlineControl';
import LabelControl from './LabelControl';
import { DescriptionEditor } from './DescriptionEditor';
import SubtaskControl from './SubtaskControl';
import { TaskDtoBody } from '../../../features/api/plans/interfaces/TaskBody';

export interface CreateTaskFormProps {
  controlled?: boolean;
  onCreate: (values: TaskDtoBody, form: FormInstance) => void;
  submitLoadingState: boolean;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({
  controlled = false,
  onCreate,
  submitLoadingState,
}) => {
  const [form] = Form.useForm();

  const initialValues = {
    title: '',
    description: '',
    todos: [],
    priority: 2,
    deadline: Date.now().toString(),
    labels: [],
  };

  const onFinish = () => {
    if (submitLoadingState) {
      return;
    }
    form
      .validateFields()
      .then((formData: TaskDtoBody) => {
        onCreate(formData, form);
      })
      .catch((info) => console.error('Validate failed', info));
  };

  return (
    <Form
      className='flex gap-5 flex-col w-full'
      form={form}
      {...(!controlled && { initialValues })}
      onFinish={onFinish}>
      <div className='flex border-0 border-b border-solid border-dividerDark'>
        <div className='flex-grow pr-4 border-0 border-r border-solid border-dividerDark'>
          <Form.Item name='title' rules={[{ required: true }]}>
            <Input
              className='font-sans font-bold text-lg tracking-tight'
              placeholder='Your topic title'
              bordered={false}
            />
          </Form.Item>
          <div className='mt-8'>
            <div className='text-general text-sm'>Description</div>
            <Form.Item name='description'>
              <DescriptionEditor />
            </Form.Item>
          </div>
          <div className='mt-8'>
            <div className='text-general text-sm'>Add subtasks</div>
            <Form.Item name='todos'>
              <SubtaskControl />
            </Form.Item>
          </div>
        </div>

        <div className='w-64 flex flex-col gap-4 pl-4'>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Priority</span>
              <Form.Item name='priority'>
                <PriorityControl />
              </Form.Item>
            </Col>
          </Row>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Deadline</span>
              <Form.Item name='deadline'>
                <DeadlineControl />
              </Form.Item>
            </Col>
          </Row>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Labels</span>
              <Space wrap>
                <Form.Item name='labels'>
                  <LabelControl />
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
      <div className='flex justify-between'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBorderColor: '#27AE60',
                defaultColor: '#27AE60',
                colorPrimary: '#27AE60',
                colorPrimaryActive: '#27AE60',
                colorPrimaryHover: '#FFFFFF',
              },
            },
          }}>
          {controlled && (
            <Button
              className='font-sans hover:bg-[#27AE60]'
              disabled={!controlled}>
              Mark as done
            </Button>
          )}
        </ConfigProvider>
        <Form.Item className='m-0'>
          <Button
            htmlType='submit'
            className='bg-accent-primary font-sans w-28'
            loading={submitLoadingState}
            type='primary'>
            Create
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateTaskForm;
