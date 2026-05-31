import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5958056334367225"
        crossOrigin="anonymous"
      />

      <Component {...pageProps} />
    </>
  );
}
