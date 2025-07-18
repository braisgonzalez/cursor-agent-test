"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const TABS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "data", label: "Data" },
  { key: "insights", label: "Insights" },
  { key: "contact", label: "Contact" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
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

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className={styles.tabContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.heroTitle}>Welcome to Ocean Health Insights</h1>
              <p className={styles.heroSubtitle}>
                A modern, fullstack demo inspired by <a href="https://www.oceanhealthindex.org/" target="_blank" rel="noopener noreferrer">Ocean Health Index</a>.<br />
                Explore data, insights, and more with a beautiful, interactive UI.
              </p>
            </div>
            <div className={styles.cardRow}>
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
            </div>
            <section className={styles.bgSection}>
              <button className={styles.bgButton} onClick={() => setBgColor(getRandomColor())}>
                Change Background Color
              </button>
            </section>
          </div>
        );
      case "about":
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.sectionText}>
              This project is inspired by the Ocean Health Index and demonstrates a professional, fullstack web application using Next.js and FastAPI.<br />
              Designed for modern data-driven organizations and elegant user experience.
            </p>
          </div>
        );
      case "data":
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Data</h2>
            <p className={styles.sectionText}>
              Here you could visualize ocean health data, trends, and more.<br />
              (Data visualization placeholder)
            </p>
            <div className={styles.dataVizPlaceholder}>[Data Visualization Coming Soon]</div>
          </div>
        );
      case "insights":
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Insights</h2>
            <p className={styles.sectionText}>
              Explore insights, analytics, and key findings about ocean health.<br />
              (Insights placeholder)
            </p>
          </div>
        );
      case "contact":
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.sectionText}>
              Have questions or feedback? Reach out to us at <a href="mailto:info@oceanhealthdemo.org">info@oceanhealthdemo.org</a>.
            </p>
            <form className={styles.contactForm} onSubmit={e => { e.preventDefault(); alert('Thank you for your message!'); }}>
              <input className={styles.input} type="text" placeholder="Your Name" required />
              <input className={styles.input} type="email" placeholder="Your Email" required />
              <textarea className={styles.input} placeholder="Your Message" required />
              <button className={styles.button} type="submit">Send</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page} data-testid="page-container" style={{ background: bgColor, transition: "background 0.3s" }}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <span className={styles.logo}>🌊</span>
          <span className={styles.brand}>Ocean Health Insights</span>
        </div>
        <nav className={styles.navTabs} role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={
                styles.tabButton +
                (activeTab === tab.key ? " " + styles.activeTab : "")
              }
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls={`tabpanel-${tab.key}`}
              tabIndex={activeTab === tab.key ? 0 : -1}
              onClick={() => setActiveTab(tab.key)}
              data-testid={`tab-${tab.key}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      <main className={styles.main} id={`tabpanel-${activeTab}`} role="tabpanel">
        {renderTabContent()}
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Ocean Health Insights &mdash; Powered by Next.js & FastAPI
      </footer>
    </div>
  );
}
