import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Account, AccountContext } from '@/context/account';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Account>
      <AccountContext.Consumer>
        {({ account }) => <Component {...pageProps} account={account} />}
      </AccountContext.Consumer>
    </Account>
  );
}
