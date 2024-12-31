import React from 'react';
import { Form, Input, Select, Button, message, Collapse } from 'antd';
import useProxyServerStore from '../stores/proxyServerStore';
import { ProxyServerConfig } from '../types/proxyServer';

const { Option } = Select;
const { Panel } = Collapse;

interface ProxyServerFormProps {
  onSuccess?: () => void;
}

const ProxyServerForm: React.FC<ProxyServerFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const addServer = useProxyServerStore((state) => state.addServer);

  const handleSubmit = (values: any) => {
    try {
      addServer(values as ProxyServerConfig);
      message.success('代理服务器添加成功');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('添加代理服务器失败');
      console.error(error);
    }
  };

  const renderAdditionalFields = (type: string) => {
    switch (type) {
      case 'ss':
        return (
          <>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '密码至少8位，包含字母和数字'
                }
              ]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item
              label="加密方法"
              name="method"
              rules={[{ required: true, message: '请选择加密方法' }]}
            >
              <Select placeholder="选择加密方法">
                <Option value="aes-256-gcm">AES-256-GCM</Option>
                <Option value="chacha20-ietf-poly1305">ChaCha20-IETF-Poly1305</Option>
              </Select>
            </Form.Item>
          </>
        );
      case 'vmess':
        return (
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="VMess 配置" key="1">
              <Form.Item
                label="UUID"
                name="uuid"
                rules={[
                  { required: true, message: '请输入 UUID' },
                  {
                    pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                    message: '请输入有效的 UUID v4 格式'
                  }
                ]}
              >
                <Input placeholder="UUID" />
              </Form.Item>
              <Form.Item
                label="Alter ID"
                name="alterId"
                rules={[{ required: true, message: '请输入 Alter ID' }]}
              >
                <Input type="number" placeholder="Alter ID" />
              </Form.Item>
              <Form.Item
                label="加密方式"
                name="security"
                rules={[{ required: true, message: '请选择加密方式' }]}
              >
                <Select placeholder="选择加密方式">
                  <Option value="auto">自动</Option>
                  <Option value="aes-128-gcm">AES-128-GCM</Option>
                  <Option value="chacha20-poly1305">ChaCha20-Poly1305</Option>
                  <Option value="none">无</Option>
                </Select>
              </Form.Item>
            </Panel>
          </Collapse>
        );
      case 'trojan':
        return (
          <>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item
              label="跳过证书验证"
              name="skipCertVerify"
              valuePropName="checked"
            >
              <Select placeholder="是否跳过证书验证">
                <Option value={true}>是</Option>
                <Option value={false}>否</Option>
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
      onFinish={handleSubmit}
      initialValues={{ type: 'ss' }}
    >
      <Form.Item
        label="服务器名称"
        name="name"
        rules={[{ required: true, message: '请输入服务器名称' }]}
      >
        <Input placeholder="服务器名称" />
      </Form.Item>

      <Form.Item
        label="服务器类型"
        name="type"
        rules={[{ required: true, message: '请选择服务器类型' }]}
      >
        <Select onChange={() => form.resetFields(['password', 'method', 'uuid', 'alterId', 'security', 'skipCertVerify'])}>
          <Option value="ss">Shadowsocks</Option>
          <Option value="vmess">VMess</Option>
          <Option value="trojan">Trojan</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="服务器地址"
        name="server"
        rules={[
          { required: true, message: '请输入服务器地址' },
          {
            pattern: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$|^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
            message: '请输入有效的IP地址或域名'
          }
        ]}
      >
        <Input placeholder="服务器地址" />
      </Form.Item>

      <Form.Item
        label="端口"
        name="port"
        rules={[
          { required: true, message: '请输入端口号' },
          {
            type: 'number',
            min: 1,
            max: 65535,
            message: '端口号必须在1到65535之间'
          }
        ]}
      >
        <Input type="number" placeholder="端口号" />
      </Form.Item>

      <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
        {() => renderAdditionalFields(form.getFieldValue('type'))}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          添加服务器
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProxyServerForm;