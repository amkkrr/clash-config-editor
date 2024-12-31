import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useProxyServerStore from '../stores/proxyServerStore';

const ProxyServerList: React.FC = () => {
  const { servers, deleteServer } = useProxyServerStore();

  const columns = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        switch (type) {
          case 'ss':
            return 'Shadowsocks';
          case 'vmess':
            return 'VMess';
          case 'trojan':
            return 'Trojan';
          default:
            return type;
        }
      },
    },
    {
      title: '服务器地址',
      dataIndex: 'server',
      key: 'server',
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个服务器吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    try {
      deleteServer(id);
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
      console.error(error);
    }
  };

  const handleEdit = (server: any) => {
    // TODO: 实现编辑功能
    console.log('编辑服务器:', server);
  };

  return (
    <Table
      dataSource={servers}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default ProxyServerList;