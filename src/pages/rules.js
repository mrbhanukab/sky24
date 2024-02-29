import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/rules.module.css";

const languageFiles = {
  1: "/rules/english.md",
  2: "/rules/sinhala.md",
  3: "/rules/tamil.md",
};

const LanguageButtons = ({ handleLanguageChange }) => (
  <div className={styles.btnGrp}>
    <button onClick={() => handleLanguageChange(1)}>English</button>
    <button onClick={() => handleLanguageChange(2)}>සිංහල</button>
    <button onClick={() => handleLanguageChange(3)}>தமிழ்</button>
  </div>
);

export default function Home() {
  const [language, setLanguage] = useState(1);
  const [markdownContent, setMarkdownContent] = useState("");

  const fetchMarkdown = useMemo(
    () => async () => {
      try {
        const response = await fetch(languageFiles[language]);
        if (!response.ok) throw new Error("Failed to fetch Markdown content");
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error(error);
        alert("Error fetching Markdown content");
      }
    },
    [language]
  );

  useEffect(() => {
    fetchMarkdown();
  }, [fetchMarkdown]);

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
      <main className={styles.mainContainer}>
        <div className={styles.Head}>
          <h1>RULES & REGULATIONS</h1>
          <LanguageButtons handleLanguageChange={handleLanguageChange} />
        </div>
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
    </>
  );
}
