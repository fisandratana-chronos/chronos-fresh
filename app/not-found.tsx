export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
      <p style={{ color: '#64748B' }}>This tool page doesn't exist yet.</p>
      <a href="/" style={{ color: '#2563EB' }}>← Back to home</a>
    </main>
  )
}
