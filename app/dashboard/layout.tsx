import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard-shell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <DashboardShell
      userName={session.user.name ?? 'Usuário'}
      userEmail={session.user.email ?? ''}
      userRole={session.user.role ?? 'USER'}
    >
      {children}
    </DashboardShell>
  )
}
