import React from 'react';
import { Form, Input, Switch, Select } from 'antd';

const Option = Select.Option;

const ConfigForm: React.FC = () => {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Port">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Socks Port">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Allow LAN">
        <Switch />
      </Form.Item>
      <Form.Item label="Mode">
        <Select>
          <Select.Option value="global">Global</Select.Option>
          <Select.Option value="rule">Rule</Select.Option>
          <Select.Option value="direct">Direct</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Log Level">
        <Select>
          <Select.Option value="info">Info</Select.Option>
          <Select.Option value="warning">Warning</Select.Option>
          <Select.Option value="error">Error</Select.Option>
          <Select.Option value="debug">Debug</Select.Option>
          <Select.Option value="silent">Silent</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm;