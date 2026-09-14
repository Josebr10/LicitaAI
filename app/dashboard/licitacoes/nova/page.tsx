import { LicitacaoForm } from '@/components/licitacao-form'

export const metadata = { title: 'Nova Licitação' }

export default function NovaLicitacaoPage() {
  return <LicitacaoForm mode="create" />
}
