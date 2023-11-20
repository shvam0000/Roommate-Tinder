import { Footer, Navbar } from '@/components/shared';
import { Hero } from '../components/home';
import { Layout } from '@/layout';

export default function Home() {
  return (
    <main>
      <Layout>
        <Hero />
      </Layout>
    </main>
  );
}
