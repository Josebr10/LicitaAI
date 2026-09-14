'use client'

import Link from 'next/link'
import { StatusBadge } from '@/components/status-badge'
import { MODALIDADE_LABELS } from '@/lib/constants'
import { formatCurrency, formatDate } from '@/lib/format'
import { Building2, Calendar, ArrowRight, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  items: any[]
}

export function LandingLicitacoesPreview({ items }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-card py-16 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <FolderOpen className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">Nenhuma licitação cadastrada ainda.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any, i: number) => (
        <motion.div
          key={item?.id ?? i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <Link
            href={`/licitacoes/${item?.id}`}
            className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all hover:shadow-md"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-muted-foreground">#{item?.numero}</span>
              <StatusBadge status={item?.status ?? 'RASCUNHO'} />
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug line-clamp-2">{item?.nome}</h3>
            <div className="mt-auto pt-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{item?.orgao}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-primary">{formatCurrency(item?.valorEstimado)}</span>
                {item?.dataAbertura && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item?.dataAbertura)}
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
  )
}
