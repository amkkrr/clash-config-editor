import React from 'react';
import { Form, Input, Select, Button, Collapse } from 'antd';
import type { ProxyGroup } from '../types/proxyGroup';
import useProxyGroupStore from '../stores/proxyGroupStore';

export type { ProxyGroupFormProps };

const { Option } = Select;
const { Panel } = Collapse;

interface ProxyGroupFormProps {
  initialValues?: ProxyGroup;
  onSuccess?: () => void;
}

const ProxyGroupForm: React.FC<ProxyGroupFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const addGroup = useProxyGroupStore((state) => state.addGroup);
  const updateGroup = useProxyGroupStore((state) => state.updateGroup);

  const handleSubmit = (values: any) => {
    try {
      if (initialValues) {
        updateGroup(initialValues.id, values);
      } else {
        addGroup({ ...values, id: Date.now().toString() });
      }
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  const renderAdditionalFields = (type: string) => {
    switch (type) {
      case 'url-test':
        return (
          <>
            <Form.Item
              label="测试URL"
              name="url"
              rules={[{ required: true, message: '请输入测试URL' }]}
            >
              <Input placeholder="测试URL" />
            </Form.Item>
            <Form.Item
              label="测试间隔"
              name="interval"
              rules={[{ required: true, message: '请输入测试间隔' }]}
            >
              <Input type="number" placeholder="测试间隔（秒）" />
            </Form.Item>
          </>
        );
      case 'fallback':
        return (
          <>
            <Form.Item
              label="测试URL"
              name="url"
              rules={[{ required: true, message: '请输入测试URL' }]}
            >
              <Input placeholder="测试URL" />
            </Form.Item>
            <Form.Item
              label="测试间隔"
              name="interval"
              rules={[{ required: true, message: '请输入测试间隔' }]}
            >
              <Input type="number" placeholder="测试间隔（秒）" />
            </Form.Item>
          </>
        );
      case 'load-balance':
        return (
          <>
            <Form.Item
              label="策略"
              name="strategy"
              rules={[{ required: true, message: '请选择策略' }]}
            >
              <Select placeholder="选择策略">
                <Option value="round-robin">轮询</Option>
                <Option value="random">随机</Option>
              </Select>
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input placeholder="名称" />
      </Form.Item>

      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select onChange={() => form.resetFields(['url', 'interval', 'strategy'])}>
          <Option value="select">Select</Option>
          <Option value="url-test">URL-Test</Option>
          <Option value="fallback">Fallback</Option>
          <Option value="load-balance">Load-Balance</Option>
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
        {() => renderAdditionalFields(form.getFieldValue('type'))}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? '更新' : '创建'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProxyGroupForm;