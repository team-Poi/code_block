import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import React, { useRef, useState } from "react";
import styles from "../style/code.module.css";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path
      fill="#990000"
      d="M480-414 282-216q-14 14-33 14t-33-14q-14-14-14-33t14-33l198-198-198-198q-14-14-14-33t14-33q14-14 33-14t33 14l198 198 198-198q14-14 33-14t33 14q14 14 14 33t-14 33L546-480l198 198q14 14 14 33t-14 33q-14 14-33 14t-33-14L480-414Z"
    />
  </svg>
);

const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path
      fill="#985601"
      d="M527-480q-19.75 0-33.375-13.625T480-527v-240q0-19.75 13.675-33.875Q507.351-815 527.175-815 547-815 561-800.875 575-786.75 575-767v126l230-230q14-14 33-14t33 14q14 14 14 33t-14 33L641-575h126q19.75 0 33.875 14.175 14.125 14.176 14.125 34Q815-507 800.875-493.5 786.75-480 767-480H527ZM89-89q-14-14-14-33t14-33l231-231H193q-19.75 0-33.375-13.675Q146-413.351 146-433.175 146-453 159.625-466.5 173.25-480 193-480h240q19.75 0 33.375 13.625T480-433v240q0 19.75-13.675 33.375Q452.649-146 432.825-146 413-146 399.5-159.625 386-173.25 386-193v-127L155-89q-14 14-33 14T89-89Z"
    />
  </svg>
);

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path
      fill="#006200"
      d="M219-172q-19.75 0-33.375-13.625T172-219v-144q0-19.75 13.675-33.375Q199.351-410 219.175-410 239-410 252.5-396.375 266-382.75 266-363v97h97q19.75 0 33.375 13.675Q410-238.649 410-218.825 410-199 396.375-185.5 382.75-172 363-172H219Zm-.175-378Q199-550 185.5-563.625 172-577.25 172-597v-144q0-19.75 13.625-33.875T219-789h144q19.75 0 33.375 14.175 13.625 14.176 13.625 34Q410-721 396.375-707.5 382.75-694 363-694h-97v97q0 19.75-13.675 33.375Q238.649-550 218.825-550ZM597-172q-19.75 0-33.375-13.675Q550-199.351 550-219.175 550-239 563.625-252.5 577.25-266 597-266h97v-97q0-19.75 13.675-33.375Q721.351-410 741.175-410 761-410 775-396.375 789-382.75 789-363v144q0 19.75-14.125 33.375T741-172H597Zm143.825-378Q721-550 707.5-563.625 694-577.25 694-597v-97h-97q-19.75 0-33.375-13.675Q550-721.351 550-741.175 550-761 563.625-775 577.25-789 597-789h144q19.75 0 33.875 14.125T789-741v144q0 19.75-14.175 33.375-14.176 13.625-34 13.625Z"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    viewBox="0 -960 960 960"
    width="48"
    className={styles.icon}
  >
    <path
      fill="#0e3b4f"
      d="M180-81q-24 0-42-18t-18-42v-573q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T180-714v573h444q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5Q654-98 645.375-89.5T624-81H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z"
    />
  </svg>
);

const classNames = (...args: string[]) => args.join(" ");
const optCSS = (enabled: boolean, style: string) => (enabled ? style : "");

interface CodeFile {
  lang?: string;
  filename?: string;
  code?: string;
}

export default function CodeBlock(props: {
  language?: string;
  code?: string;
  filename?: string;
  file?: CodeFile;
  files?: CodeFile[];
}) {
  const [fullsized, setFullsized] = useState(false);
  const [lpos, setLPos] = useState(0);
  const [tpos, setTPos] = useState(0);
  const [hsize, setHSize] = useState(0);
  const [wsize, setWSize] = useState(0);
  const [positioned, setPositioned] = useState(false);
  const [selectedFile, setSelectedFile] = useState(0);
  const int_er = useRef<NodeJS.Timeout>();
  const codeRef = React.createRef<HTMLDivElement>();

  const doCopy = (text: string) => {
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

  const code = props.code || 'console.log("Hello, World!");';
  const lang = props.language || "javascript";

  let files: CodeFile[] = [];

  if (props.files) files = props.files;
  else if (props.file) files = [props.file];
  else
    files = [
      {
        code: code,
        lang: lang,
        filename: props.filename,
      },
    ];

  const toggleFullsized = (data?: boolean) => {
    setFullsized((j) => {
      const jj = !data || j;
      if (codeRef.current) {
        setTPos(codeRef.current.offsetTop);
        setLPos(codeRef.current.offsetLeft);
        setWSize(codeRef.current.clientWidth);
        setHSize(codeRef.current.clientHeight);
      }

      if (jj) {
        clearTimeout(int_er.current);
        setPositioned(false);
      } else
        int_er.current = setTimeout(() => {
          setPositioned(true);
        }, 0);

      return !jj;
    });
  };

  return (
    <div className={classNames(styles.container)}>
      <div
        className={classNames(
          styles.code_block,
          optCSS(fullsized, styles.enabled),
          optCSS(positioned, styles.positioned)
        )}
        style={{
          ...(fullsized
            ? {
                left: lpos,
                top: tpos,
                width: wsize,
                height: hsize,
              }
            : {}),
        }}
        ref={codeRef}
      >
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.dots}>
              <span
                className={styles.dot}
                onClick={() => {
                  toggleFullsized(false);
                }}
              >
                <CloseIcon />
              </span>
              <span
                className={styles.dot}
                onClick={() => {
                  toggleFullsized(false);
                }}
              >
                <MinimizeIcon />
              </span>
              <span
                className={styles.dot}
                onClick={() => {
                  toggleFullsized(true);
                }}
              >
                <FullscreenIcon />
              </span>
              <span
                className={styles.dot}
                onClick={() => doCopy(files[selectedFile].code || code)}
              >
                <CopyIcon />
              </span>
            </div>
            <div className={styles.files}>
              {files.map((file, index) => (
                <div
                  className={classNames(
                    styles.file,
                    optCSS(selectedFile == index, styles.enabled)
                  )}
                  key={index}
                  onClick={() => setSelectedFile(index)}
                >
                  <span>{file.filename || file.lang}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.body}>
          {files.map((file, index) => (
            <div
              key={`file.${index}`}
              className={classNames(
                styles.code,
                optCSS(index == selectedFile, styles.enabled),
                optCSS(fullsized, styles.fullsized)
              )}
            >
              <SyntaxHighlighter
                language={file.lang || lang}
                style={atomOneDark}
              >
                {file.code || code}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames(styles.bg, optCSS(fullsized, styles.enabled))}
        onClick={() => {
          toggleFullsized(false);
        }}
      ></div>
    </div>
  );
}
