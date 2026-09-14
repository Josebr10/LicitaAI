'use client'

import { CheckCircle2, Clock, FileText, Building2, DollarSign, Play, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const timelineSteps = [
  { label: 'Publicação', done: true },
  { label: 'Propostas', done: true },
  { label: 'Julgamento', done: true },
  { label: 'Habilitação', active: true },
  { label: 'Homologação', done: false },
]

export function LandingHeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl border bg-card p-5 sm:p-6"
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">Nº 024/2026</span>
          </div>
          <h3 className="mt-1.5 text-base font-semibold leading-snug">
            Aquisição de equipamentos de informática
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          <Play className="h-3 w-3" />
          Em andamento
        </span>
      </div>

      {/* Info grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          <span>Prefeitura Municipal</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5" />
          <span className="font-mono">R$ 480.000,00</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Abertura: 20/10/2026</span>
        </div>
      </div>

      {/* Mini timeline */}
      <div className="mt-5 border-t pt-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Andamento do processo</p>
        <div className="flex items-center gap-1">
          {timelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    step.done
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                      : step.active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : (i + 1)}
                </div>
                <span className={`mt-1 text-[10px] leading-tight ${
                  step.active ? 'font-semibold text-primary' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < timelineSteps.length - 1 && (
                <div className={`mx-0.5 h-0.5 w-4 sm:w-6 ${
                  step.done ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
