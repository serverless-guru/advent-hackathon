import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Archivo } from 'next/font/google';

const archivoFont = Archivo({
   display: 'swap',
   subsets: ['latin'],
   variable: '--font-sans',
});
export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${archivoFont.className} bg-[#000] flex justify-center` }><Component {...pageProps} /></main>
}
