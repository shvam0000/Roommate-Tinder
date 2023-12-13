import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/context/account';
import NextTopLoader from 'nextjs-toploader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Account>
      <NextTopLoader color="#F65B5B" />
      <AccountContext.Consumer>
        {({ account }) => <Component {...pageProps} account={account} />}
      </AccountContext.Consumer>
    </Account>
  );
}
