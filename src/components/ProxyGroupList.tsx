import React, { useRef, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import useProxyGroupStore from '../stores/proxyGroupStore';
import type { ProxyGroup } from '../types/proxyGroup';
import ProxyGroupForm from './ProxyGroupForm';

interface ProxyGroupListProps {
  onAddClick?: () => void;
  onEditClick?: (group: ProxyGroup) => void;
}

interface DraggableRowProps {
  index: number;
  record: ProxyGroup;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableRow: React.FC<DraggableRowProps> = ({ index, record, moveRow, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ProxyGroup',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ProxyGroup',
    hover: (item: { index: number }) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLTableRowElement>(null);
  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  const backgroundColor = isDragging ? '#fafafa' : 'transparent';

  return (
    <tr
      ref={ref}
      style={{ opacity, backgroundColor, transition: 'all 0.2s ease' }}
      {...props}
    />
  );
};

const ProxyGroupList: React.FC<ProxyGroupListProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ProxyGroup | null>(null);

  const showModal = (group?: ProxyGroup) => {
    setEditingGroup(group || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGroup(null);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingGroup(null);
  };
  const { groups, removeGroup, reorderGroups } = useProxyGroupStore();

  const handleDelete = (id: string) => {
    try {
      removeGroup(id);
      message.success('代理组删除成功');
    } catch (error) {
      message.error('删除代理组失败');
      console.error(error);
    }
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    reorderGroups(dragIndex, hoverIndex);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '代理数量',
      dataIndex: 'proxies',
      key: 'proxies',
      render: (proxies: string[]) => proxies.length,
    },
    {
      title: '测试URL',
      dataIndex: 'url',
      key: 'url',
      render: (url: string, record: ProxyGroup) => {
        if (['url-test', 'fallback'].includes(record.type)) {
          return url || '未设置';
        }
        return 'N/A';
      },
    },
    {
      title: '测试间隔',
      dataIndex: 'interval',
      key: 'interval',
      render: (interval: number, record: ProxyGroup) => {
        if (['url-test', 'fallback'].includes(record.type)) {
          return interval ? `${interval}秒` : '未设置';
        }
        return 'N/A';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ProxyGroup) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个代理组吗？"
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
          添加代理组
        </Button>
      </div>
      <Table
        dataSource={groups}
        columns={columns}
        rowKey="id"
        pagination={false}
        components={{
          body: {
            row: (props: any) => (
              <DraggableRow
                index={props['data-row-key']}
                record={props.record}
                moveRow={moveRow}
                {...props}
              />
            ),
          },
        }}
      />
      <Modal
        title={editingGroup ? '编辑代理组' : '添加代理组'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ProxyGroupForm
          initialValues={editingGroup}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
};

export default ProxyGroupList;