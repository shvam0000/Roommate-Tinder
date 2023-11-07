import { Html, Head, Main, NextScript } from 'next/document';
import { Footer, Navbar } from '../components/shared';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  );
}
