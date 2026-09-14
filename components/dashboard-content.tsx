'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { STATUS_LABELS, MODALIDADE_LABELS } from '@/lib/constants'
import { formatCurrency } from '@/lib/format'
import {
  FileText,
  Send,
  Search,
  Play,
  CheckCircle2,
  Lock,
  XCircle,
  DollarSign,
  Wallet,
  TrendingUp,
  PlusCircle,
  Clock,
  FolderOpen,
  ArrowRight,
  Users,
  Compass,
} from 'lucide-react'

interface DashboardData {
  total: number
  statusCounts: Record<string, number>
  modalidadeCounts: Record<string, number>
  recentes: any[]
  valorEstimadoTotal: string
  verbaLiberadaTotal: string
  isAdmin: boolean
}

export function DashboardContent({ data }: { data: DashboardData }) {
  const {
    total,
    statusCounts,
    modalidadeCounts,
    recentes,
    valorEstimadoTotal,
    verbaLiberadaTotal,
    isAdmin,
  } = data ?? ({} as DashboardData)

  const isEmpty = (total ?? 0) === 0

  const statusKpis = [
    { label: 'Publicadas', key: 'PUBLICADA', icon: Send, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' },
    { label: 'Em análise', key: 'EM_ANALISE', icon: Search, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30' },
    { label: 'Em andamento', key: 'EM_ANDAMENTO', icon: Play, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Homologadas', key: 'HOMOLOGADA', icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' },
    { label: 'Encerradas', key: 'ENCERRADA', icon: Lock, color: 'text-gray-500 bg-gray-100 dark:bg-gray-800' },
    { label: 'Canceladas', key: 'CANCELADA', icon: XCircle, color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30' },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {isAdmin ? 'Gestão da plataforma' : 'Minhas licitações'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? 'Visão geral de todos os processos licitatórios da plataforma.'
              : 'Visão geral dos seus processos licitatórios.'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/licitacoes">
              <Compass className="mr-2 h-4 w-4" />
              Explorar licitações
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/licitacoes/nova">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova licitação
            </Link>
          </Button>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Nenhuma licitação encontrada</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {isAdmin
                  ? 'A plataforma ainda não possui licitações cadastradas.'
                  : 'Você ainda não possui licitações cadastradas. Crie sua primeira ou explore as licitações públicas.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/dashboard/licitacoes/nova">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Criar licitação
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/licitacoes">
                  <Compass className="mr-2 h-4 w-4" />
                  Explorar licitações
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Top KPIs */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">{total ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Total de licitações</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold tabular-nums">{formatCurrency(valorEstimadoTotal)}</p>
                  <p className="text-xs text-muted-foreground">Valor total estimado</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold tabular-nums">{formatCurrency(verbaLiberadaTotal)}</p>
                  <p className="text-xs text-muted-foreground">Verba total liberada</p>
                </div>
              </CardContent>
            </Card>
            {isAdmin && (
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Administração</p>
                      <Link href="/dashboard/usuarios" className="text-sm font-medium text-primary hover:underline">Gerenciar usuários →</Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Status distribution + Modalidade */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Distribuição por status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {statusKpis.map((kpi) => {
                  const count = statusCounts?.[kpi.key] ?? 0
                  const pct = (total ?? 0) > 0 ? Math.round((count / (total ?? 1)) * 100) : 0
                  return (
                    <div key={kpi.key} className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${kpi.color}`}>
                        <kpi.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="w-24 text-sm text-muted-foreground">{kpi.label}</span>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary/60 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="w-8 text-right font-mono text-xs font-medium tabular-nums">{count}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-primary" />
                  Distribuição por modalidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {Object.entries(MODALIDADE_LABELS).map(([key, label]) => {
                  const count = modalidadeCounts?.[key] ?? 0
                  const pct = (total ?? 0) > 0 ? Math.round((count / (total ?? 1)) * 100) : 0
                  if (count === 0) return null
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="w-32 truncate text-sm text-muted-foreground">{label}</span>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary/40 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="w-8 text-right font-mono text-xs font-medium tabular-nums">{count}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent */}
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-primary" />
                Licitações recentes
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/licitacoes">
                  Ver todas
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {(recentes ?? []).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma licitação cadastrada.</p>
              ) : (
                <div className="space-y-2">
                  {(recentes ?? []).map((item: any) => (
                    <Link
                      key={item?.id}
                      href={`/licitacoes/${item?.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item?.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          #{item?.numero} · {item?.orgao}
                          {isAdmin && item?.criadorNome ? ` · ${item.criadorNome}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden font-mono text-sm sm:block">{formatCurrency(item?.valorEstimado)}</span>
                        <StatusBadge status={item?.status ?? 'RASCUNHO'} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
