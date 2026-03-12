import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Builder — Playground',
  description:
    'Try the PraiSol visual website builder for free. Drag & drop components to build your school, college, or business website — no coding required.',
  robots: { index: true, follow: true },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
