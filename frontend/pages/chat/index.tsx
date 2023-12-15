import { ProtectedRoute } from '@/components/auth';
import { Layout } from '@/layout';
import React from 'react';

const Chat = () => {
  return (
    <Layout>
      <ProtectedRoute>Chat</ProtectedRoute>
    </Layout>
  );
};

export default Chat;
