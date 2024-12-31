import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ProxyServerPage from './pages/ProxyServerPage';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/proxy-servers" element={<ProxyServerPage />} />
            <Route path="/" element={<ProxyServerPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;