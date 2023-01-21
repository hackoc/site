import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import splitbee from '@splitbee/web';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  }, []);
  return (
    <>
      <Head>
        <link rel="favicon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Script 
        defer 
        data-domain="hackoc.org"
        src="https://plausible.io/js/plausible.js"
      />
      <Script
        defer
        crossorigin="anonymous"
        src="https://cdn.splitbee.io/sb.js"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
