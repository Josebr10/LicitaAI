'use client'

import { CheckCircle2, Circle, XCircle, Ban } from 'lucide-react'
import { motion } from 'framer-motion'

const TIMELINE_STEPS = [
  { key: 'publicacao', label: 'Publicação', statusMatch: ['PUBLICADA'] },
  { key: 'propostas', label: 'Propostas', statusMatch: ['EM_ANALISE'] },
  { key: 'julgamento', label: 'Julgamento', statusMatch: ['EM_ANDAMENTO'] },
  { key: 'habilitacao', label: 'Habilitação', statusMatch: ['EM_ANDAMENTO'] },
  { key: 'recursos', label: 'Recursos', statusMatch: ['EM_ANDAMENTO'] },
  { key: 'homologacao', label: 'Homologação', statusMatch: ['HOMOLOGADA'] },
  { key: 'encerramento', label: 'Encerramento', statusMatch: ['ENCERRADA'] },
]

// Map status to which step index is currently active
function getActiveStepIndex(status: string): number {
  switch (status) {
    case 'RASCUNHO': return -1
    case 'PUBLICADA': return 0
    case 'EM_ANALISE': return 1
    case 'EM_ANDAMENTO': return 3 // habilitação step (mid-process)
    case 'HOMOLOGADA': return 5
    case 'ENCERRADA': return 6
    case 'CANCELADA': return -2
    default: return -1
  }
}

export function LicitacaoTimeline({ status }: { status: string }) {
  const activeIndex = getActiveStepIndex(status)
  const isCancelled = status === 'CANCELADA'
  const isDraft = status === 'RASCUNHO'

  if (isCancelled) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
        <div className="flex items-center gap-3">
          <Ban className="h-5 w-5 text-red-600 dark:text-red-400" />
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">Processo cancelado</p>
            <p className="text-sm text-red-600/80 dark:text-red-400/80">Esta licitação foi cancelada e não possui mais andamento.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {isDraft && (
        <div className="mb-4 rounded-lg border bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">Esta licitação está em rascunho e ainda não foi publicada.</p>
        </div>
      )}

      {/* Desktop horizontal */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between">
          {/* Background line */}
          <div className="absolute left-[24px] right-[24px] top-5 h-0.5 bg-border" />
          {/* Completed line */}
          {activeIndex >= 0 && (
            <div
              className="absolute left-[24px] top-5 h-0.5 bg-emerald-500 transition-all dark:bg-emerald-400"
              style={{
                width: `${Math.min(100, (activeIndex / (TIMELINE_STEPS.length - 1)) * 100)}%`,
              }}
            />
          )}
          {TIMELINE_STEPS.map((step, i) => {
            const isDone = activeIndex >= 0 && i < activeIndex
            const isActive = i === activeIndex
            const isFuture = activeIndex < 0 || i > activeIndex

            return (
              <motion.div
                key={step.key}
                className="relative z-10 flex flex-col items-center"
                style={{ width: `${100 / TIMELINE_STEPS.length}%` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    isDone
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                      : isActive
                      ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-md'
                      : 'border-border bg-card text-muted-foreground/50'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-center text-xs font-medium leading-tight ${
                    isDone
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="space-y-0 lg:hidden">
        {TIMELINE_STEPS.map((step, i) => {
          const isDone = activeIndex >= 0 && i < activeIndex
          const isActive = i === activeIndex

          return (
            <div key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    isDone
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                      : isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground/50'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                </div>
                {i < TIMELINE_STEPS.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[20px] ${isDone ? 'bg-emerald-400 dark:bg-emerald-600' : 'bg-border'}`} />
                )}
              </div>
              <div className="pb-4">
                <span className={`text-sm font-medium ${
                  isDone ? 'text-emerald-700 dark:text-emerald-400' : isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-primary">Etapa atual</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
