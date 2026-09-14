'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/status-badge'
import { MODALIDADE_LABELS, STATUS_OPTIONS, MODALIDADE_OPTIONS } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/format'
import {
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  Calendar,
  DollarSign,
  ArrowRight,
  LayoutGrid,
  List,
  FolderOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { LicitacoesFilter } from '@/app/actions/licitacoes'

interface Props {
  items: any[]
  total: number
  page: number
  totalPages: number
  filters: LicitacoesFilter
  orgaos: string[]
}

export function LicitacoesListClient({ items, total, page, totalPages, filters, orgaos }: Props) {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [form, setForm] = useState({
    search: filters?.search || '',
    numero: filters?.numero || '',
    status: filters?.status || '',
    modalidade: filters?.modalidade || '',
    orgao: filters?.orgao || '',
    valorMin: filters?.valorMin || '',
    valorMax: filters?.valorMax || '',
    dataInicio: filters?.dataInicio || '',
    dataFim: filters?.dataFim || '',
  })

  const buildUrl = useCallback((overrides: Record<string, string>) => {
    const p = new URLSearchParams()
    const merged = { ...form, ...overrides }
    for (const [k, v] of Object.entries(merged)) {
      if (v) p.set(k, v)
    }
    return `/licitacoes?${p.toString()}`
  }, [form])

  const handleFilter = () => router.push(buildUrl({ page: '1' }))
  const handleClear = () => {
    setForm({ search: '', numero: '', status: '', modalidade: '', orgao: '', valorMin: '', valorMax: '', dataInicio: '', dataFim: '' })
    router.push('/licitacoes')
  }
  const goToPage = (p: number) => router.push(buildUrl({ page: String(p) }))

  const hasActiveFilters = Object.entries(filters ?? {}).some(([k, v]) => v && k !== 'page')

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome, órgão, número ou objeto..."
            value={form.search}
            onChange={(e: any) => setForm({ ...form, search: e?.target?.value ?? '' })}
            onKeyDown={(e: any) => e?.key === 'Enter' && handleFilter()}
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

      {/* Extended filters */}
      {showFilters && (
        <div className="mb-6 rounded-xl border bg-card p-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Número</label>
              <Input value={form.numero} onChange={(e: any) => setForm({ ...form, numero: e?.target?.value ?? '' })} placeholder="Ex: 001/2026" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.status} onChange={(e: any) => setForm({ ...form, status: e?.target?.value ?? '' })}>
                <option value="">Todos</option>
                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Modalidade</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.modalidade} onChange={(e: any) => setForm({ ...form, modalidade: e?.target?.value ?? '' })}>
                <option value="">Todas</option>
                {MODALIDADE_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Órgão</label>
              <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.orgao} onChange={(e: any) => setForm({ ...form, orgao: e?.target?.value ?? '' })}>
                <option value="">Todos</option>
                {(orgaos ?? []).map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Valor mínimo (R$)</label>
              <Input type="number" value={form.valorMin} onChange={(e: any) => setForm({ ...form, valorMin: e?.target?.value ?? '' })} placeholder="0" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Valor máximo (R$)</label>
              <Input type="number" value={form.valorMax} onChange={(e: any) => setForm({ ...form, valorMax: e?.target?.value ?? '' })} placeholder="999.999" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Data início</label>
              <Input type="date" value={form.dataInicio} onChange={(e: any) => setForm({ ...form, dataInicio: e?.target?.value ?? '' })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Data fim</label>
              <Input type="date" value={form.dataFim} onChange={(e: any) => setForm({ ...form, dataFim: e?.target?.value ?? '' })} />
            </div>
          </div>
        </div>
      )}

      {/* Results info + view toggle */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {(total ?? 0) === 0 ? 'Nenhuma licitação encontrada.' : `${total} licitação(s) encontrada(s)`}
        </p>
        <div className="hidden gap-1 sm:flex">
          <Button variant={viewMode === 'cards' ? 'default' : 'ghost'} size="icon-sm" onClick={() => setViewMode('cards')} aria-label="Visualização em cards">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="icon-sm" onClick={() => setViewMode('table')} aria-label="Visualização em tabela">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {(total ?? 0) === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-card py-16 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <FolderOpen className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">Nenhuma licitação encontrada.</p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={handleClear}>
              <X className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Cards view (default + always on mobile) */}
          <div className={viewMode === 'table' ? 'hidden sm:hidden' : ''}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {(items ?? []).map((item: any, i: number) => (
                <motion.div
                  key={item?.id ?? i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/licitacoes/${item?.id}`}
                    className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all hover:shadow-md"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="font-mono text-xs text-muted-foreground">#{item?.numero}</span>
                        <span className="mx-1.5 text-xs text-muted-foreground/50">·</span>
                        <span className="text-xs text-muted-foreground">{MODALIDADE_LABELS[item?.modalidade] ?? item?.modalidade}</span>
                      </div>
                      <StatusBadge status={item?.status ?? 'RASCUNHO'} />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug line-clamp-2">{item?.nome}</h3>
                    {item?.objeto && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.objeto}</p>
                    )}
                    <div className="mt-auto pt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3 shrink-0" />
                        <span className="truncate">{item?.orgao}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-3 w-3 text-primary" />
                          <span className="font-mono text-sm font-medium text-primary">{formatCurrency(item?.valorEstimado)}</span>
                        </div>
                        {item?.dataAbertura && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.dataAbertura)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ver detalhes <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Table view (desktop only) */}
          {viewMode === 'table' && (
            <div className="hidden overflow-x-auto rounded-xl border bg-card sm:block" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Número</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Órgão</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Modalidade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Valor est.</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Abertura</th>
                    <th className="w-10 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(items ?? []).map((item: any) => (
                    <tr key={item?.id} className="transition-colors hover:bg-accent/30">
                      <td className="px-4 py-3 font-mono text-xs">{item?.numero}</td>
                      <td className="max-w-[200px] truncate px-4 py-3 font-medium">{item?.nome}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item?.orgao}</td>
                      <td className="px-4 py-3 text-muted-foreground">{MODALIDADE_LABELS[item?.modalidade] ?? item?.modalidade}</td>
                      <td className="px-4 py-3"><StatusBadge status={item?.status ?? 'RASCUNHO'} /></td>
                      <td className="px-4 py-3 text-right font-mono">{formatCurrency(item?.valorEstimado)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(item?.dataAbertura)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/licitacoes/${item?.id}`} className="text-primary hover:underline">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile cards always shown when table mode */}
          {viewMode === 'table' && (
            <div className="grid gap-3 sm:hidden">
              {(items ?? []).map((item: any) => (
                <Link key={item?.id} href={`/licitacoes/${item?.id}`} className="block rounded-xl border bg-card p-4 transition-colors hover:bg-accent/50" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item?.nome}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">#{item?.numero}</p>
                    </div>
                    <StatusBadge status={item?.status ?? 'RASCUNHO'} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span className="truncate">{item?.orgao}</span>
                    <span className="font-mono text-primary">{formatCurrency(item?.valorEstimado)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {(totalPages ?? 0) > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Página {page} de {totalPages}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={(page ?? 1) <= 1} onClick={() => goToPage((page ?? 1) - 1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled={(page ?? 1) >= (totalPages ?? 1)} onClick={() => goToPage((page ?? 1) + 1)}>
                  Próxima
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
