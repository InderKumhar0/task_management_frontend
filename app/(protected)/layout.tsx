// (protected)/layout.tsx

'use client';

import AuthGuard from '@/components/AuthGuard';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <main className="">{children}</main>
      </div>
    </AuthGuard>
  );
}
