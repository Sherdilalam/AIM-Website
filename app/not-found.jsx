import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        fontFamily: '"Open Sans", system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '3rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.125rem', opacity: 0.75, marginTop: '0.5rem' }}>This page could not be found.</p>
      <Link href="/" style={{ marginTop: '1.5rem', fontWeight: 600 }}>
        Back to home
      </Link>
    </main>
  );
}
