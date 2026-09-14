import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Shield } from 'lucide-react'
import { ROLE_LABELS } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

export const metadata = { title: 'Configurações' }

export default async function ConfiguracoesPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Informações da sua conta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados da conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Nome</p>
              <p className="text-sm text-muted-foreground">{session.user.name ?? '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">E-mail</p>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{session.user.email ?? '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Papel</p>
              <Badge variant={session.user.role === 'ADMIN' ? 'default' : 'secondary'} className="mt-0.5">
                {ROLE_LABELS[session.user.role] ?? session.user.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
