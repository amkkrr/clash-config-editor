import React, { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import useProxyGroupStore from '../stores/proxyGroupStore';
import type { ProxyGroup } from '../types/proxyGroup';

interface ProxyGroupFormProps {
  initialValues: ProxyGroup | null;
  onSuccess?: () => void;
}

const ProxyGroupForm: React.FC<ProxyGroupFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const { addGroup, updateGroup } = useProxyGroupStore();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = async (values: ProxyGroup) => {
    try {
      if (initialValues) {
        await updateGroup(initialValues.id, values);
        message.success('代理组更新成功');
      } else {
        await addGroup({ ...values, id: Date.now().toString() });
        message.success('代理组添加成功');
      }
      onSuccess?.();
    } catch (error) {
      message.error('操作失败');
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || undefined}
      onFinish={onFinish}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: '请输入代理组名称' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择代理组类型' }]}
      >
        <Select>
          <Select.Option value="select">Select</Select.Option>
          <Select.Option value="url-test">URL-Test</Select.Option>
          <Select.Option value="fallback">Fallback</Select.Option>
          <Select.Option value="load-balance">Load-Balance</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="代理列表"
        name="proxies"
        rules={[{ required: true, message: '请选择至少一个代理' }]}
      >
        <Select mode="multiple">
          {/* 这里需要从代理服务器列表中获取选项 */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? '更新' : '添加'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProxyGroupForm;