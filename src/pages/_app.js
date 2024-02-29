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
    const handleKeyDown = (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "C" || e.key === "J" || e.key === "I")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextmenu);
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
      document.removeEventListener("keydown", handleKeyDown);
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
