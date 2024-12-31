import React from 'react';
import { Form, Input, Switch, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface BasicConfigFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const BasicConfigForm: React.FC<BasicConfigFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm<FormInstance>();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="端口"
        name="port"
        rules={[{ required: true, message: '请输入端口号' }]}
      >
        <Input type="number" id="port-input" />
      </Form.Item>

      <Form.Item
        label="Socks 端口"
        name="socks-port"
        rules={[{ required: true, message: '请输入 Socks 端口号' }]}
      >
        <Input type="number" id="socks-port-input" />
      </Form.Item>

      <Form.Item
        label="允许局域网连接"
        name="allow-lan"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="模式"
        name="mode"
        rules={[{ required: true, message: '请选择模式' }]}
      >
        <Select>
          <Select.Option value="rule">规则模式</Select.Option>
          <Select.Option value="global">全局模式</Select.Option>
          <Select.Option value="direct">直连模式</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="日志级别"
        name="log-level"
        rules={[{ required: true, message: '请选择日志级别' }]}
      >
        <Select>
          <Select.Option value="debug">Debug</Select.Option>
          <Select.Option value="info">Info</Select.Option>
          <Select.Option value="warning">Warning</Select.Option>
          <Select.Option value="error">Error</Select.Option>
          <Select.Option value="silent">Silent</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default BasicConfigForm;