"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const TABS = ["Home", "Features", "Pricing", "About", "Contact"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");
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

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className={styles.tabContent}>
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
          </div>
        );
      case "Features":
        return (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Features</div>
              <ul className={styles.featureList}>
                <li>⚡ Blazing fast Next.js frontend</li>
                <li>🐍 Python FastAPI backend integration</li>
                <li>🔒 Secure, modern authentication (ready to extend)</li>
                <li>🎨 Beautiful, responsive UI inspired by Canva</li>
                <li>🧪 Fullstack testing and CI/CD</li>
                <li>🚀 One-click Vercel deployment</li>
                <li>🌈 Customizable color themes</li>
                <li>📱 Mobile-first design</li>
              </ul>
            </div>
          </div>
        );
      case "Pricing":
        return (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Pricing</div>
              <div className={styles.pricingGrid}>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingTier}>Free</div>
                  <div className={styles.pricingPrice}>$0</div>
                  <ul>
                    <li>All core features</li>
                    <li>Community support</li>
                    <li>Unlimited API calls</li>
                  </ul>
                  <button className={styles.button}>Get Started</button>
                </div>
                <div className={styles.pricingCard} style={{ borderColor: '#fbbf24', boxShadow: '0 0 0 2px #fbbf24' }}>
                  <div className={styles.pricingTier}>Pro</div>
                  <div className={styles.pricingPrice}>$19/mo</div>
                  <ul>
                    <li>Everything in Free</li>
                    <li>Priority support</li>
                    <li>Advanced analytics</li>
                    <li>Custom integrations</li>
                  </ul>
                  <button className={styles.button}>Upgrade</button>
                </div>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingTier}>Enterprise</div>
                  <div className={styles.pricingPrice}>Contact Us</div>
                  <ul>
                    <li>All Pro features</li>
                    <li>Dedicated support</li>
                    <li>Custom SLAs</li>
                    <li>On-premise options</li>
                  </ul>
                  <button className={styles.button}>Contact Sales</button>
                </div>
              </div>
            </div>
          </div>
        );
      case "About":
        return (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>About Us</div>
              <div className={styles.cardDesc}>
                <b>Cursor Agents</b> is a modern fullstack demo project, built to showcase best practices in React, Next.js, and Python FastAPI integration.<br /><br />
                Our mission is to empower developers to build, test, and deploy fullstack apps with ease and confidence.<br /><br />
                <b>Team:</b>
                <ul>
                  <li>Brais González — Lead Developer</li>
                  <li>OpenAI GPT-4 — AI Assistant</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "Contact":
        return (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Contact</div>
              <div className={styles.cardDesc}>
                Have questions or want to get in touch?<br />
                <b>Email:</b> hello@cursoragents.dev<br />
                <b>Twitter:</b> <a href="https://twitter.com/cursoragents" target="_blank" rel="noopener noreferrer">@cursoragents</a><br />
                <b>GitHub:</b> <a href="https://github.com/braisgonzalez/cursor-agent-test" target="_blank" rel="noopener noreferrer">cursor-agent-test</a>
              </div>
              <form className={styles.contactForm} onSubmit={e => { e.preventDefault(); alert('Message sent! (demo)'); }}>
                <input className={styles.input} type="text" placeholder="Your Name" required />
                <input className={styles.input} type="email" placeholder="Your Email" required />
                <textarea className={styles.input} placeholder="Your Message" required />
                <button className={styles.button} type="submit">Send Message</button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page} data-testid="page-container" style={{ background: bgColor, transition: "background 0.3s" }}>
      <nav className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
            data-testid={`tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </nav>
      <main className={styles.main}>
        {renderTabContent()}
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Cursor Agents Demo &mdash; Powered by Next.js & FastAPI
      </footer>
    </div>
  );
}
