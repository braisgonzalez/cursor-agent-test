"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#fff");
  const [loading, setLoading] = useState(false);

  // Helper to get the correct API URL depending on environment
  const getApiUrl = () => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return "http://localhost:8000/hello";
    }
    return "/api/hello";
  };

  // Fetch message from Python backend
  const fetchApiMessage = async () => {
    setLoading(true);
    setApiMessage(null);
    try {
      const res = await fetch(getApiUrl());
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setApiMessage(data.body || JSON.stringify(data));
    } catch (e) {
      setApiMessage("Error calling the API");
    } finally {
      setLoading(false);
    }
  };

  // Generate a random background color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={styles.page} style={{ background: bgColor, transition: "background 0.3s" }}>
      <main className={styles.main}>
        <h1>Visual Demo: Next.js + Python API</h1>
        <section style={{ margin: "2rem 0" }}>
          <h2>Counter</h2>
          <button onClick={() => setCount(count - 1)}>-</button>
          <span style={{ margin: "0 1rem" }}>{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </section>
        <section style={{ margin: "2rem 0" }}>
          <h2>Python Backend Communication</h2>
          <button onClick={fetchApiMessage} disabled={loading}>
            {loading ? "Loading..." : "Call hello.py API"}
          </button>
          {apiMessage && (
            <div style={{ marginTop: "1rem", fontWeight: "bold" }}>{apiMessage}</div>
          )}
        </section>
        <section style={{ margin: "2rem 0" }}>
          <h2>Change Background Color</h2>
          <button onClick={() => setBgColor(getRandomColor())}>Random Color</button>
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
