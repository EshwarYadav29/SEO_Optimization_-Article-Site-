import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top Navigation ─────────────────────────────── */}
      <header
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              aria-hidden="true"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.875rem',
              }}
            >
              C
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#111827',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                CMS Admin
              </p>
              <p style={{ fontSize: '0.6875rem', color: '#9ca3af', lineHeight: 1 }}>
                Content Management
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Admin navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.875rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                textDecoration: 'none',
                transition: 'background 0.15s ease',
              }}
            >
              <span aria-hidden="true">📋</span> Articles
            </Link>
            <Link
              href="/admin/articles/new"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.875rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
                textDecoration: 'none',
                boxShadow: '0 1px 4px rgba(37,99,235,0.3)',
                transition: 'opacity 0.15s ease',
              }}
            >
              <span aria-hidden="true">+</span> New Article
            </Link>
          </nav>

          {/* View site link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8125rem',
              color: '#6b7280',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span aria-hidden="true">↗</span> View site
          </a>
        </div>
      </header>

      {/* ── Page Content ───────────────────────────────── */}
      <main
        id="main-content"
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1.5rem',
        }}
      >
        {children}
      </main>

      {/* ── Admin Footer ───────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          textAlign: 'center',
          color: '#d1d5db',
          fontSize: '0.75rem',
        }}
      >
        CMS Admin · {new Date().getFullYear()}
      </footer>
    </div>
  )
}