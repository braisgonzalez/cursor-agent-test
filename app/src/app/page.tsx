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
  const [showMinesweeper, setShowMinesweeper] = useState(false);

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

  // Minesweeper Game Component
  const MinesweeperGame = () => {
    const [board, setBoard] = useState<Array<Array<{ isMine: boolean; isRevealed: boolean; isFlagged: boolean; neighborCount: number }>>>([]);
    const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
    const [mineCount, setMineCount] = useState(10);
    const BOARD_SIZE = 9;
    const MINE_COUNT = 10;

    // Initialize board
    const initializeBoard = () => {
      const newBoard = Array(BOARD_SIZE).fill(null).map(() =>
        Array(BOARD_SIZE).fill(null).map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        }))
      );

      // Place mines randomly
      let minesPlaced = 0;
      while (minesPlaced < MINE_COUNT) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].isMine = true;
          minesPlaced++;
        }
      }

      // Calculate neighbor counts
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (!newBoard[row][col].isMine) {
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const newRow = row + dr;
                const newCol = col + dc;
                if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                  if (newBoard[newRow][newCol].isMine) count++;
                }
              }
            }
            newBoard[row][col].neighborCount = count;
          }
        }
      }

      setBoard(newBoard);
      setGameState("playing");
      setMineCount(MINE_COUNT);
    };

    // Initialize board on component mount
    React.useEffect(() => {
      initializeBoard();
    }, []);

    // Reveal cell and adjacent empty cells
    const revealCell = (row: number, col: number) => {
      if (gameState !== "playing" || board[row][col].isRevealed || board[row][col].isFlagged) return;

      const newBoard = [...board];
      const toReveal = [[row, col]];
      const revealed = new Set<string>();

      while (toReveal.length > 0) {
        const [currentRow, currentCol] = toReveal.pop()!;
        const key = `${currentRow}-${currentCol}`;
        
        if (revealed.has(key) || currentRow < 0 || currentRow >= BOARD_SIZE || 
            currentCol < 0 || currentCol >= BOARD_SIZE || 
            newBoard[currentRow][currentCol].isRevealed || 
            newBoard[currentRow][currentCol].isFlagged) continue;

        revealed.add(key);
        newBoard[currentRow][currentCol].isRevealed = true;

        if (newBoard[currentRow][currentCol].isMine) {
          setGameState("lost");
          // Reveal all mines
          for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
              if (newBoard[r][c].isMine) {
                newBoard[r][c].isRevealed = true;
              }
            }
          }
          break;
        }

        if (newBoard[currentRow][currentCol].neighborCount === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              toReveal.push([currentRow + dr, currentCol + dc]);
            }
          }
        }
      }

      setBoard(newBoard);

      // Check win condition
      if (gameState === "playing") {
        const unrevealedNonMines = newBoard.flat().filter(cell => !cell.isRevealed && !cell.isMine).length;
        if (unrevealedNonMines === 0) {
          setGameState("won");
        }
      }
    };

    // Toggle flag on cell
    const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (gameState !== "playing" || board[row][col].isRevealed) return;

      const newBoard = [...board];
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
      setMineCount(MINE_COUNT - newBoard.flat().filter(cell => cell.isFlagged).length);
    };

    const getCellDisplay = (cell: any) => {
      if (cell.isFlagged) return "🚩";
      if (!cell.isRevealed) return "";
      if (cell.isMine) return "💣";
      if (cell.neighborCount === 0) return "";
      return cell.neighborCount.toString();
    };

    const getCellClass = (cell: any) => {
      let className = styles.mineCell;
      if (cell.isRevealed) className += " " + styles.revealed;
      if (cell.isMine && cell.isRevealed) className += " " + styles.mine;
      return className;
    };

    return (
      <div className={styles.minesweeperGame}>
        <div className={styles.mineHeader}>
          <button 
            className={styles.button} 
            onClick={() => setShowMinesweeper(false)}
          >
            ← Back to Home
          </button>
          <div className={styles.mineStats}>
            <span>Mines: {mineCount}</span>
            <button className={styles.button} onClick={initializeBoard}>
              New Game
            </button>
            <span>Status: {gameState === "playing" ? "🙂" : gameState === "won" ? "😎" : "😵"}</span>
          </div>
        </div>
        {gameState === "won" && <div className={styles.winMessage}>🎉 You Won! 🎉</div>}
        {gameState === "lost" && <div className={styles.loseMessage}>💥 Game Over! 💥</div>}
        <div className={styles.mineBoard}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.mineRow}>
              {row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(cell)}
                  onClick={() => revealCell(rowIndex, colIndex)}
                  onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                  disabled={gameState !== "playing"}
                >
                  {getCellDisplay(cell)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className={styles.tabContent}>
            {showMinesweeper ? (
              <MinesweeperGame />
            ) : (
              <>
                <div className={styles.topButtonSection}>
                  <button 
                    className={styles.minesweeperButton} 
                    onClick={() => setShowMinesweeper(true)}
                  >
                    🎮 Play Minesweeper
                  </button>
                </div>
                <div className={styles.heroSection}>
                  <h1 className={styles.heroTitle}>Welcome to Brais Analytics</h1>
                  <p className={styles.heroSubtitle}>
                    A modern, fullstack demo.<br />
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
              </>
            )}
          </div>
        );
      case "about":
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.sectionText}>
              This project is inspired by modern analytics platforms and demonstrates a professional, fullstack web application using Next.js and FastAPI.<br />
              Designed for data-driven organizations and elegant user experience.
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
              Have questions or feedback? Reach out to us at <a href="mailto:info@braisanalytics.com">info@braisanalytics.com</a>.
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
          <span className={styles.logo}>🪐</span>
          <span className={styles.brand}>Brais Analytics</span>
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
        &copy; {new Date().getFullYear()} Brais Analytics &mdash; Powered by Next.js & FastAPI
      </footer>
    </div>
  );
}
