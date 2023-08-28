import '~/styles/globals.css';

import type { AppProps } from 'next/app';
import { Inter, Poppins } from 'next/font/google';
import Head from 'next/head';
import { QueryClientProvider } from '@tanstack/react-query';

import { Footer } from '~/components/Footer';
import { ThemeProvider } from '~/components/theme-provider';
import { AxiosManager } from '~/lib/axios';
import { queryClient } from '~/lib/react-query';
import { ApiClientProvider } from '~/providers/ApiClientProvider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const axiosManager = new AxiosManager();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiClientProvider axiosManager={axiosManager}>
      <QueryClientProvider client={queryClient}>
        <main className={`${inter.variable} ${poppins.variable} font-sans`}>
          <Head>
            <title>V6 Academy - Learn to Code the Practical Way</title>
          </Head>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </main>
      </QueryClientProvider>
    </ApiClientProvider>
  );
}
