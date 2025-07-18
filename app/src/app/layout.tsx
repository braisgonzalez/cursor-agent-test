export const metadata = {
  title: 'Cursor Agents Demo',
  description: 'A professional fullstack demo with Next.js & FastAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: 'linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%)', fontFamily: 'Inter, Geist, Segoe UI, Arial, sans-serif' }}>
        <header style={{
          width: '100%',
          background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
          color: '#fff',
          padding: '0 0',
          boxShadow: '0 2px 8px 0 rgba(99, 102, 241, 0.08)',
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 2rem',
          }}>
            <div style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#fbbf24', fontWeight: 900 }}>Cursor</span> Agents
            </div>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', opacity: 0.9 }}>Home</a>
              <a href="#" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', opacity: 0.9 }}>Features</a>
              <a href="#" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', opacity: 0.9 }}>Pricing</a>
              <a href="#" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', opacity: 0.9 }}>About</a>
              <a href="#" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', opacity: 0.9 }}>Contact</a>
            </nav>
            <button style={{
              background: 'linear-gradient(90deg, #fbbf24 0%, #f59e42 100%)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.6rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(251, 191, 36, 0.08)',
              transition: 'background 0.2s, transform 0.1s',
            }}>Sign Up</button>
          </div>
        </header>
        <main style={{ minHeight: 'calc(100vh - 80px)', background: 'none' }}>{children}</main>
      </body>
    </html>
  )
}
