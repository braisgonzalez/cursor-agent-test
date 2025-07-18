"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#fff");
  const [loading, setLoading] = useState(false);

  // Helper to get the correct API URL depending on environment
  const getApiUrl = () => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return "http://localhost:8000/api/hello";
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
    <div className={styles.page} data-testid="page-container" style={{ background: bgColor, transition: "background 0.3s" }}>
      <header className={styles.header}>
        <span style={{ color: "#6366f1" }}>Cursor Agents</span> Fullstack Demo
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Python API Demo</div>
          <div className={styles.cardDesc}>
            This demo shows a modern React (Next.js) frontend calling a Python FastAPI backend.<br />
            Click the button to call the <b>hello</b> endpoint!
          </div>
          <button className={styles.button} onClick={fetchApiMessage} disabled={loading}>
            {loading ? "Loading..." : "Call hello.py API"}
          </button>
          <div className={styles.apiResult}>
            {apiMessage ? apiMessage : ""}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Counter Example</div>
          <div className={styles.cardDesc}>
            A simple interactive counter using React state.
          </div>
          <div className={styles.counter}>
            <button className={styles.counterBtn} onClick={() => setCount(count - 1)}>-</button>
            <span className={styles.counterValue}>{count}</span>
            <button className={styles.counterBtn} onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
        <section className={styles.bgSection}>
          <button className={styles.bgButton} onClick={() => setBgColor(getRandomColor())}>
            Change Background Color
          </button>
        </section>
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Cursor Agents Demo &mdash; Powered by Next.js & FastAPI
      </footer>
    </div>
  );
}
