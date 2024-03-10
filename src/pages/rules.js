import React, { useState, useEffect } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/rules.module.css";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const languageFiles = {
  1: { path: "/rules/english.md", loadingText: "Loading English Content ..." },
  2: { path: "/rules/sinhala.md", loadingText: "Loading Sinhala Content ..." },
  3: { path: "/rules/tamil.md", loadingText: "Loading Tamil Content ..." },
};

const LanguageButtons = ({ handleLanguageChange }) => (
  <div className={styles.btnGrp}>
    <button onClick={() => handleLanguageChange(1)}>English</button>
    <button onClick={() => handleLanguageChange(2)}>සිංහල</button>
    <button onClick={() => handleLanguageChange(3)}>தமிழ்</button>
  </div>
);

export default function Rules() {
  const [language, setLanguage] = useState(1);
  const [markdownContent, setMarkdownContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(languageFiles[language].path);
        if (!response.ok) throw new Error("Failed to fetch Markdown content");
        const text = await response.text();
        setMarkdownContent(text);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error(error);
        alert("Error fetching Markdown content");
      }
    };

    fetchMarkdown();

    // Cleanup function to prevent setting state on unmounted component
    return () => setLoading(true);
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      <Head>
        <title>SKY`24 | Rules & Regulations</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
      </Head>
      {loading ? (
        <Loading txt={languageFiles[language].loadingText} />
      ) : (
        <main className={styles.mainContainer}>
          <div className={styles.Head}>
            <h1>RULES & REGULATIONS</h1>
            <LanguageButtons handleLanguageChange={handleLanguageChange} />
          </div>{" "}
          <ReactMarkdown
            className={`${styles.markdown} ${
              language === 2 ? styles.langSinhala : ""
            } ${language === 3 ? styles.langTamil : ""}`}
            components={{
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              p: ({ children }) => <p>{children}</p>,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </main>
      )}
      <Footer />
    </>
  );
}
