import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { fetchAllUsers } from '@/app/actions/licitacoes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users, Shield, User, Mail, Calendar, FileText } from 'lucide-react'
import { ROLE_LABELS } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

export const metadata = { title: 'Usuários' }

export default async function UsuariosPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if (session.user.role !== 'ADMIN') redirect('/dashboard')

  const result = await fetchAllUsers()
  if ('error' in result) redirect('/dashboard')

  const users = result.users ?? []

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Usuários da plataforma
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral de todas as contas cadastradas. Somente leitura.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Papel</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Licitações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u: any) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                          {u.role === 'ADMIN' ? <Shield className="h-3.5 w-3.5 text-primary" /> : <User className="h-3.5 w-3.5 text-muted-foreground" />}
                        </div>
                        {u.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span suppressHydrationWarning>{u.email}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.role === 'ADMIN' ? 'default' : 'secondary'} className="text-xs">
                        {ROLE_LABELS[u.role] ?? u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—'}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{u.totalLicitacoes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {users.map((u: any) => (
              <div key={u.id} className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    {u.role === 'ADMIN' ? <Shield className="h-3.5 w-3.5 text-primary" /> : <User className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate" suppressHydrationWarning>{u.email}</p>
                  </div>
                  <Badge variant={u.role === 'ADMIN' ? 'default' : 'secondary'} className="text-xs">
                    {ROLE_LABELS[u.role] ?? u.role}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {u.totalLicitacoes} licitações</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—'}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
