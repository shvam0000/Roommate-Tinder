import { ProtectedRoute } from '@/components/auth';
import { Hero } from '@/components/match';
import { Layout } from '@/layout';

const Match = () => {
  return (
    <Layout>
      <ProtectedRoute>
        <Hero />
      </ProtectedRoute>
    </Layout>
  );
};

export default Match;
