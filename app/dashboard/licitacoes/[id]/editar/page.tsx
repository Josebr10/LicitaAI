import { notFound } from 'next/navigation'
import { fetchLicitacaoById, checkEditPermission } from '@/app/actions/licitacoes'
import { LicitacaoForm } from '@/components/licitacao-form'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldAlert, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'Editar Licitação' }

export default async function EditarLicitacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const permission = await checkEditPermission(id)

  if (!permission.allowed) {
    if (permission.reason === 'not_found') notFound()

    if (permission.reason === 'auth') {
      return (
        <div className="mx-auto max-w-lg py-16">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                <LogIn className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold">Acesso necessário</h2>
              <p className="text-sm text-muted-foreground">
                Você precisa estar conectado para editar esta licitação.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/cadastro">Criar conta</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // forbidden
    return (
      <div className="mx-auto max-w-lg py-16">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
              <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-lg font-semibold">Sem permissão</h2>
            <p className="text-sm text-muted-foreground">
              Você não tem permissão para editar esta licitação.
              Somente o proprietário ou o administrador podem editá-la.
            </p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/licitacoes">Voltar para licitações</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const licitacao = await fetchLicitacaoById(id)
  if (!licitacao) notFound()

  return <LicitacaoForm mode="edit" initialData={licitacao} id={id} />
}
