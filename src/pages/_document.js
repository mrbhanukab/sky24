import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <footer>
          <a href="https://www.youtube.com/@isipathana-astro" target="_blank">
            Youtube
          </a>
          &nbsp;|&nbsp;
          <a href="https://www.instagram.com/isipathana.astro" target="_blank">
            Instagram
          </a>
          &nbsp;|&nbsp;
          <a href="https://www.facebook.com/isipathana.astro" target="_blank">
            Facebook
          </a>
          &nbsp;|&nbsp;
          <a href="https://github.com/mrbhanukab" target="_blank">
            Developer
          </a>
        </footer>
      </body>
    </Html>
  );
}
