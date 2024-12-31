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

      <Form.Item
        label="服务器地址"
        name="server"
        rules={[
          { required: true, message: '请输入服务器地址' },
          {
            pattern: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
            message: '请输入有效的服务器地址'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="端口号"
        name="port"
        rules={[
          { required: true, message: '请输入端口号' },
          {
            pattern: /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: '端口号必须在 1-65535 之间'
          }
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="UUID"
        name="uuid"
        rules={[
          { required: true, message: '请输入 UUID' },
          {
            pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            message: '请输入有效的 UUID v4'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码必须包含大小写字母和数字，且至少8位'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      {['url-test', 'fallback'].includes(form.getFieldValue('type')) && (
        <>
          <Form.Item
            label="测试URL"
            name="url"
            rules={[
              { required: true, message: '请输入测试URL' },
              {
                pattern: /^https?:\/\/.+/,
                message: '请输入有效的URL，必须以http://或https://开头'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="测试间隔（秒）"
            name="interval"
            rules={[
              { required: true, message: '请输入测试间隔' },
              {
                pattern: /^[1-9]\d*$/,
                message: '测试间隔必须为正整数'
              }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? '更新' : '添加'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProxyGroupForm;