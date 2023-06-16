import type { AppProps } from 'next/app'

import '@vercel/examples-ui/globals.css'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  // const Layout = getLayout<LayoutProps>(Component)

  return (
    <>
      <Head>
        <title>Turingtown</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
