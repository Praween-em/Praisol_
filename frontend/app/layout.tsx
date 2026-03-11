import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PraiSol — Build & Deploy Your System',
  description: 'Create school, college, and business management websites with a visual builder. Deploy in minutes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
