import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link href="/" className="text-xl font-bold">ObservabiliTrends</Link>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        © 2025 ObservabiliTrends. All rights reserved.
      </footer>
    </div>
  );
}