import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import splitbee from '@splitbee/web';
import { Analytics } from "@vercel/analytics/react";


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
        {/* dangerous innerhtml script */}
        <script dangerouslySetInnerHTML={{ __html: `
      !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','t2_sl22gnht', {"optOut":false,"useDecimalCurrencyValues":true,"aaid":"<AAID-HERE>","email":"<EMAIL-HERE>","externalId":"<EXTERNAL-ID-HERE>","idfa":"<IDFA-HERE>"});rdt('track', 'PageVisit');
          `}} />
          
          <script src="https://www.googletagmanager.com/gtag/js?id=AW-11164215889"></script>
        <script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-11164215889');

`}} />
          
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
      <Analytics />
    </>
  )
}

export default MyApp
