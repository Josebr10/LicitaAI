import { Decimal } from '@prisma/client/runtime/library'

export function formatCurrency(value: Decimal | number | string | null | undefined): string {
  if (value == null) return 'R$ 0,00'
  const num = typeof value === 'number' ? value : Number(String(value))
  if (isNaN(num)) return 'R$ 0,00'
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
