import React, { useState, useEffect } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/rules.module.css";

export default function Home() {
  const [language, setLanguage] = useState(1);
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    let markdownFile;
    // Determine which Markdown file to fetch based on selected language
    switch (language) {
      case 1:
        markdownFile = "/rules/english.md";
        break;
      case 2:
        markdownFile = "/rules/sinhala.md";
        break;
      case 3:
        markdownFile = "/rules/tamil.md";
        break;
      default:
        markdownFile = "/rules/english.md";
    }

    // Fetch the Markdown content from the file
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);
      })
      .catch((error) => {
        alert("Error fetching Markdown content");
      });
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang); // Set language based on clicked button text
  };

  return (
    <>
      <Head>
        <title> SKY`24 | Rules & Regulations</title>
        <meta
          name="description"
          content="Sky24, A Quiz Competition Hosted by ICAS"
        />
      </Head>
      <main className={styles.mainContainer}>
        <div className={styles.Head}>
          <h1>RULES & REGULATIONS</h1>
          <div className={styles.btnGrp}>
            <button onClick={() => handleLanguageChange(1)}>English</button>
            <button onClick={() => handleLanguageChange(2)}>සිංහල</button>
            <button onClick={() => handleLanguageChange(3)}>தமிழ்</button>
          </div>
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
