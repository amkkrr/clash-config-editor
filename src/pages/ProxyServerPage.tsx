import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ProxyServerForm from '../components/ProxyServerForm';
import ProxyServerList from '../components/ProxyServerList';

const ProxyServerPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  return (
    <Card
      title="代理服务器管理"
      extra={
        <Button type="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '隐藏表单' : '添加服务器'}
        </Button>
      }
    >
      {showForm && <ProxyServerForm onSuccess={handleFormSuccess} />}
      <ProxyServerList />
    </Card>
  );
};

export default ProxyServerPage;