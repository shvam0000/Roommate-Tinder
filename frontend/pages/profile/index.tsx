import { ProtectedRoute } from '@/components/auth';
import { Hero } from '@/components/profile';
import { Layout } from '@/layout';

const Profile = () => {
  return (
    <div>
      <Layout>
        <ProtectedRoute>
          <Hero />
        </ProtectedRoute>
      </Layout>
    </div>
  );
};

export default Profile;
