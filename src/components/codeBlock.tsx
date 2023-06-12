import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import React from "react";
import styles from "../style/code.module.css";

export default function CodeBlock(props: { language?: string; code?: string }) {
  const doCopy = (text: string) => {
    // 흐음 1.
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Copied to clipboard");
        })
        .catch(() => {
          alert("Failed to copy");
        });
    } else {
      if (!document.queryCommandSupported("copy")) {
        return alert("Copying does not supported on your browser");
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Copied to clipboard");
    }
  };

  let code = props.code || 'console.log("Hello, World!");';
  let lang = props.language || "javascript";

  return (
    <div className={styles.container}>
      <div className={styles.code}>
        <div className={styles.head}>
          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.title}>
            <div>{lang.charAt(0).toUpperCase() + lang.slice(1)}</div>
          </div>
        </div>
        <SyntaxHighlighter language={lang} style={atomOneDark}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className={styles.copy} onClick={() => doCopy(code)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          className={styles.icon}
        >
          <path
            fill="#ccc"
            d="M180-81q-24 0-42-18t-18-42v-573q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T180-714v573h444q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5Q654-98 645.375-89.5T624-81H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z"
          />
        </svg>
      </div>
    </div>
  );
}
