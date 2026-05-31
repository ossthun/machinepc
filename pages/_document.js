import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5958056334367225"
          crossOrigin="anonymous"
        ></script>

        {/* Favicon */}
        <link rel="icon" href="/icon.png" />

        {/* Mobile friendliness */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        {/* Basic SEO */}
        <meta
          name="description"
          content="Apprends le passé composé en français grâce à une machine interactive et un mode entraînement."
        />

        <meta
          name="keywords"
          content="passé composé, français, conjugaison, auxiliaire, participe passé, apprendre le français"
        />

        <meta name="author" content="La machine à fabriquer le passé composé" />

        {/* Open Graph (better sharing preview) */}
        <meta
          property="og:title"
          content="La machine à fabriquer le passé composé"
        />

        <meta
          property="og:description"
          content="Une manière simple et ludique d’apprendre le passé composé."
        />

        <meta property="og:type" content="website" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
