import { Badge } from '@/components/ui/badge'
import { STATUS_LABELS } from '@/lib/constants'
import {
  FileEdit,
  Send,
  Search,
  Play,
  CheckCircle2,
  Lock,
  XCircle,
} from 'lucide-react'

const STATUS_CONFIG: Record<string, { icon: React.ElementType; className: string }> = {
  RASCUNHO: { icon: FileEdit, className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
  PUBLICADA: { icon: Send, className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' },
  EM_ANALISE: { icon: Search, className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' },
  EM_ANDAMENTO: { icon: Play, className: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800' },
  HOMOLOGADA: { icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' },
  ENCERRADA: { icon: Lock, className: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700' },
  CANCELADA: { icon: XCircle, className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800' },
}

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.RASCUNHO
  const Icon = config.icon
  const label = STATUS_LABELS[status] ?? status

  return (
    <Badge variant="outline" className={`gap-1 font-medium text-xs px-2.5 py-0.5 ${config.className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}
