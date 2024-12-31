import React, { useRef } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import useProxyGroupStore from '../stores/proxyGroupStore';
import type { ProxyGroup } from '../types/proxyGroup';

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
  const [, drag] = useDrag({
    type: 'ProxyGroup',
    item: { index },
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

  return (
    <tr
      ref={ref}
      {...props}
    />
  );
};

const ProxyGroupList: React.FC<ProxyGroupListProps> = ({ onAddClick, onEditClick }) => {
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
      title: '操作',
      key: 'action',
      render: (_: any, record: ProxyGroup) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEditClick?.(record)}>
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddClick}>
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
    </>
  );
};

export default ProxyGroupList;