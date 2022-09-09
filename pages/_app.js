import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link rel="favicon" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="icon" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
