import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import useRuleStore from '../stores/ruleStore';
import type { Rule, RuleType } from '../types/rule';

interface RuleFormProps {
  initialValues?: Rule | null;
  onSuccess?: () => void;
}

const ruleTypes: { value: RuleType; label: string }[] = [
  { value: 'DOMAIN-SUFFIX', label: '域名后缀' },
  { value: 'DOMAIN-KEYWORD', label: '域名关键词' },
  { value: 'GEOIP', label: '地理位置' },
  { value: 'IP-CIDR', label: 'IP 段' },
  { value: 'PROCESS-NAME', label: '进程名' },
];

const RuleForm: React.FC<RuleFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const { addRule, updateRule } = useRuleStore();

  const onFinish = async (values: Rule) => {
    try {
      if (initialValues) {
        await updateRule(initialValues.id, values);
        message.success('规则更新成功');
      } else {
        await addRule(values);
        message.success('规则添加成功');
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
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择规则类型' }]}
      >
        <Select options={ruleTypes} />
      </Form.Item>

      <Form.Item
        label="值"
        name="value"
        rules={[{ required: true, message: '请输入规则值' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="策略"
        name="policy"
        rules={[{ required: true, message: '请输入策略' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? '更新' : '添加'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RuleForm;