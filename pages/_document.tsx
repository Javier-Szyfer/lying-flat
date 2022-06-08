import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" content="Lying Flat" />
        <meta
          name="description"
          content="Lying flat is a 20 NFT collection and a custom marketplace"
        />
        <meta property="og:url" content="https://lyingflat.place" />
        <meta
          property="og:title"
          content="Lying flat is a 20 NFT collection and a custom marketplace"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/aldi/image/upload/v1654717083/lying%20flat/og_srw9np.jpg"
          key="ogimage"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Lying flat open graph" />
        <meta name="twitter:title" content="Lying Flat" />
        <meta
          name="twitter:description"
          content="Lying flat is a 20 NFT collection and a custom marketplace"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/aldi/image/upload/v1654717083/lying%20flat/og_srw9np.jpg"
        />

        <link
          rel="preload"
          href="/fonts/cond90.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/cond130.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link href="/favicons/favicon.ico" rel="shorcut icon" />
        <link href="/favicons/manifest.json" rel="manifest" />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <meta content="#d1ccc0" name="theme-color" />
        <meta content="#d1ccc0" name="msapplication-TileColor" />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <meta
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          name="robots"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
