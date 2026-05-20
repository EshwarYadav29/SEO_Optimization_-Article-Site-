import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid var(--gray-200)',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--brand-600)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1rem',
            }}>
              ✦
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>
              CMS Admin
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/admin"
              className="btn btn-ghost"
              style={{ fontSize: '0.875rem' }}
            >
              All Articles
            </Link>
            <Link
              href="/"
              className="btn btn-ghost"
              style={{ fontSize: '0.875rem' }}
              target="_blank"
            >
              View Site ↗
            </Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </div>
  )
}