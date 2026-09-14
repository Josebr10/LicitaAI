'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/status-badge'
import { MODALIDADE_LABELS, STATUS_OPTIONS, MODALIDADE_OPTIONS } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/format'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Filter, X, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, PlusCircle, SlidersHorizontal, FolderOpen } from 'lucide-react'
import { DeleteLicitacaoDialog } from '@/components/delete-dialog'
import type { LicitacoesFilter } from '@/app/actions/licitacoes'

interface Props {
  items: any[]
  total: number
  page: number
  totalPages: number
  filters: LicitacoesFilter
  orgaos: string[]
  isAdmin?: boolean
}

export function DashboardLicitacoesClient({ items, total, page, totalPages, filters, orgaos, isAdmin }: Props) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({
    search: filters.search || '',
    numero: filters.numero || '',
    status: filters.status || '',
    modalidade: filters.modalidade || '',
    orgao: filters.orgao || '',
    valorMin: filters.valorMin || '',
    valorMax: filters.valorMax || '',
    dataInicio: filters.dataInicio || '',
    dataFim: filters.dataFim || '',
  })

  const buildUrl = useCallback((overrides: Record<string, string>) => {
    const p = new URLSearchParams()
    const merged = { ...form, ...overrides }
    for (const [k, v] of Object.entries(merged)) {
      if (v) p.set(k, v)
    }
    return `/dashboard/licitacoes?${p.toString()}`
  }, [form])

  const handleFilter = () => router.push(buildUrl({ page: '1' }))
  const handleClear = () => {
    setForm({ search: '', numero: '', status: '', modalidade: '', orgao: '', valorMin: '', valorMax: '', dataInicio: '', dataFim: '' })
    router.push('/dashboard/licitacoes')
  }
  const goToPage = (p: number) => router.push(buildUrl({ page: String(p) }))
  const hasActiveFilters = Object.values(filters).some((v) => v && v !== '1')

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {isAdmin ? 'Todas as licitações' : 'Minhas licitações'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin ? 'Gerencie todos os processos licitatórios da plataforma.' : 'Gerencie seus processos licitatórios.'}
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/licitacoes/nova">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova licitação
          </Link>
        </Button>
      </div>

      {/* Search + filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar licitações..."
            value={form.search}
            onChange={(e: any) => setForm({ ...form, search: e.target.value })}
            onKeyDown={(e: any) => e.key === 'Enter' && handleFilter()}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-xl border bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Número</label>
              <Input size="sm" value={form.numero} onChange={(e: any) => setForm({ ...form, numero: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.status} onChange={(e: any) => setForm({ ...form, status: e.target.value })}>
                <option value="">Todos</option>
                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Modalidade</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.modalidade} onChange={(e: any) => setForm({ ...form, modalidade: e.target.value })}>
                <option value="">Todas</option>
                {MODALIDADE_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Órgão</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.orgao} onChange={(e: any) => setForm({ ...form, orgao: e.target.value })}>
                <option value="">Todos</option>
                {(orgaos ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Valor mínimo</label>
              <Input type="number" size="sm" value={form.valorMin} onChange={(e: any) => setForm({ ...form, valorMin: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Valor máximo</label>
              <Input type="number" size="sm" value={form.valorMax} onChange={(e: any) => setForm({ ...form, valorMax: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Data início</label>
              <Input type="date" size="sm" value={form.dataInicio} onChange={(e: any) => setForm({ ...form, dataInicio: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Data fim</label>
              <Input type="date" size="sm" value={form.dataFim} onChange={(e: any) => setForm({ ...form, dataFim: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      <div className="mb-3 text-sm text-muted-foreground">
        {total === 0 ? 'Nenhuma licitação encontrada.' : `${total} licitação(s) encontrada(s)`}
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-card py-16 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="rounded-full bg-muted p-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <div>
            <p className="font-medium">Nenhuma licitação encontrada</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {hasActiveFilters ? 'Tente ajustar os filtros.' : (isAdmin ? 'Nenhuma licitação cadastrada na plataforma.' : 'Você ainda não criou nenhuma licitação.')}
            </p>
          </div>
          {hasActiveFilters ? (
            <Button variant="outline" size="sm" onClick={handleClear}>
              <X className="mr-2 h-4 w-4" /> Limpar filtros
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/dashboard/licitacoes/nova">
                <PlusCircle className="mr-2 h-4 w-4" /> Criar licitação
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-xl border bg-card lg:block" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Número</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Órgão</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor est.</TableHead>
                  <TableHead>Abertura</TableHead>
                  {isAdmin && <TableHead>Criado por</TableHead>}
                  <TableHead className="w-[120px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(items ?? []).map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.numero}</TableCell>
                    <TableCell className="max-w-[200px] truncate font-medium">{item.nome}</TableCell>
                    <TableCell className="text-sm">{item.orgao}</TableCell>
                    <TableCell className="text-sm">{MODALIDADE_LABELS[item.modalidade] ?? item.modalidade}</TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(item.valorEstimado)}</TableCell>
                    <TableCell className="text-sm">{formatDate(item.dataAbertura)}</TableCell>
                    {isAdmin && <TableCell className="text-sm text-muted-foreground">{item.criadorNome ?? '—'}</TableCell>}
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={`/licitacoes/${item.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={`/dashboard/licitacoes/${item.id}/editar`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => setDeleteId(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-3 lg:hidden">
            {(items ?? []).map((item: any) => (
              <div key={item.id} className="rounded-xl border bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{item.nome}</p>
                    <p className="font-mono text-xs text-muted-foreground">#{item.numero}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {item.orgao} · {formatCurrency(item.valorEstimado)}
                  {isAdmin && item.criadorNome ? ` · ${item.criadorNome}` : ''}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/licitacoes/${item.id}`}><Eye className="mr-1 h-3 w-3" />Ver</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/licitacoes/${item.id}/editar`}><Pencil className="mr-1 h-3 w-3" />Editar</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteId(item.id)}>
                    <Trash2 className="mr-1 h-3 w-3" />Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Página {page} de {totalPages}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />Anterior
                </Button>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
                  Próxima<ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteLicitacaoDialog
        id={deleteId ?? ''}
        open={!!deleteId}
        onOpenChange={(open: boolean) => { if (!open) setDeleteId(null) }}
      />
    </div>
  )
}
