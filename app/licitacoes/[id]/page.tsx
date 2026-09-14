import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublicHeader } from '@/components/public-header'
import { PublicFooter } from '@/components/public-footer'
import { fetchLicitacaoById } from '@/app/actions/licitacoes'
import { StatusBadge } from '@/components/status-badge'
import { LicitacaoTimeline } from '@/components/licitacao-timeline'
import { MODALIDADE_LABELS } from '@/lib/constants'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/format'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  Building2,
  FileText,
  DollarSign,
  Hash,
  Gavel,
  ClipboardList,
  Eye,
  Wallet,
  User,
} from 'lucide-react'
import { LicitacaoDetailActions } from '@/components/licitacao-detail-actions'

export const metadata = { title: 'Detalhes da Licitação' }

export default async function LicitacaoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const licitacao = await fetchLicitacaoById(id)

  if (!licitacao) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/licitacoes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para licitações
              </Link>
            </Button>
          </div>

          {/* Header card */}
          <div className="rounded-xl border bg-card" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="border-b p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <StatusBadge status={licitacao.status} />
                    <span className="font-mono text-sm text-muted-foreground">#{licitacao.numero}</span>
                    <span className="text-sm text-muted-foreground">{MODALIDADE_LABELS[licitacao.modalidade] ?? licitacao.modalidade}</span>
                  </div>
                  <h1 className="mt-3 font-display text-2xl font-bold tracking-tight">{licitacao.nome}</h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {licitacao.orgao}
                  </div>
                </div>
                <LicitacaoDetailActions id={licitacao.id} criadorId={(licitacao as any).criadorId ?? null} />
              </div>
            </div>

            {/* Timeline */}
            <div className="border-b p-6 sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <ClipboardList className="h-4 w-4" />
                Andamento do processo
              </h2>
              <LicitacaoTimeline status={licitacao.status} />
            </div>

            {/* Info grid */}
            <div className="p-6 sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <FileText className="h-4 w-4" />
                Informações do processo
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem icon={Hash} label="Número" value={licitacao.numero} />
                <InfoItem icon={FileText} label="Edital" value={licitacao.edital} />
                <InfoItem icon={Gavel} label="Modalidade" value={MODALIDADE_LABELS[licitacao.modalidade] ?? licitacao.modalidade} />
                <InfoItem icon={Building2} label="Órgão" value={licitacao.orgao} />
                <InfoItem icon={DollarSign} label="Valor estimado" value={formatCurrency(licitacao.valorEstimado)} highlight />
                <InfoItem icon={Wallet} label="Verba liberada" value={formatCurrency(licitacao.verbaLiberada)} />
                <InfoItem icon={Calendar} label="Data de publicação" value={formatDate(licitacao.dataPublicacao)} />
                <InfoItem icon={Calendar} label="Data de abertura" value={formatDate(licitacao.dataAbertura)} />
              </div>

              {licitacao.objeto && (
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <ClipboardList className="h-4 w-4" />
                    Objeto
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed">{licitacao.objeto}</p>
                </div>
              )}

              {licitacao.observacoes && (
                <div className="mt-4 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    Observações
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{licitacao.observacoes}</p>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span>
                  Criado em {formatDateTime(licitacao.createdAt)}
                  {(licitacao as any).criadorNome ? ` por ${(licitacao as any).criadorNome}` : ''}
                  {' · '}Atualizado em {formatDateTime(licitacao.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

function InfoItem({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className={`mt-1 text-sm font-medium ${highlight ? 'text-primary' : ''}`}>{value || '—'}</p>
    </div>
  )
}
