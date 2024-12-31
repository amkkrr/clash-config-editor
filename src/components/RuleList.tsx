import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useRuleStore from '../stores/ruleStore';
import type { Rule } from '../types/rule';
import RuleForm from './RuleForm';

const RuleList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const { rules, addRule, updateRule, removeRule } = useRuleStore();

  const showModal = (rule?: Rule) => {
    setEditingRule(rule || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRule(null);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingRule(null);
  };

  const handleDelete = (id: string) => {
    try {
      removeRule(id);
      message.success('规则删除成功');
    } catch (error) {
      message.error('删除规则失败');
      console.error(error);
    }
  };

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '策略',
      dataIndex: 'policy',
      key: 'policy',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Rule) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>编辑</Button>
          <Popconfirm
            title="确定要删除这条规则吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          添加规则
        </Button>
      </div>
      <Table
        dataSource={rules}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Modal
        title={editingRule ? '编辑规则' : '添加规则'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <RuleForm
          initialValues={editingRule}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
};

export default RuleList;