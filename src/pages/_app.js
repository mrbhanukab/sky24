import "@/styles/globals.css";
import localFont from "next/font/local";
import { useEffect } from "react";
const mollen = localFont({
  src: [
    {
      path: "./fonts/mollen-light-webfont.woff2",
      weight: "200",
      style: "light",
    },
    {
      path: "./fonts/mollen-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/mollen-bold-webfont.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  return (
    <>
      <main className={mollen.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
