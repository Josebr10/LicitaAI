import { fetchDashboardLicitacoes, fetchOrgaos, type LicitacoesFilter } from '@/app/actions/licitacoes'
import { auth } from '@/auth'
import { DashboardLicitacoesClient } from '@/components/dashboard-licitacoes-client'

export const metadata = { title: 'Gerenciar Licitações' }

export default async function DashboardLicitacoesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await auth()
  const sp = await searchParams
  const filters: LicitacoesFilter = {
    search: typeof sp.search === 'string' ? sp.search : undefined,
    numero: typeof sp.numero === 'string' ? sp.numero : undefined,
    status: typeof sp.status === 'string' ? sp.status : undefined,
    modalidade: typeof sp.modalidade === 'string' ? sp.modalidade : undefined,
    orgao: typeof sp.orgao === 'string' ? sp.orgao : undefined,
    valorMin: typeof sp.valorMin === 'string' ? sp.valorMin : undefined,
    valorMax: typeof sp.valorMax === 'string' ? sp.valorMax : undefined,
    dataInicio: typeof sp.dataInicio === 'string' ? sp.dataInicio : undefined,
    dataFim: typeof sp.dataFim === 'string' ? sp.dataFim : undefined,
    page: typeof sp.page === 'string' ? sp.page : '1',
  }

  const [result, orgaos] = await Promise.all([
    fetchDashboardLicitacoes(filters),
    fetchOrgaos(),
  ])

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardLicitacoesClient
        items={result.items}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        filters={filters}
        orgaos={orgaos}
        isAdmin={session?.user?.role === 'ADMIN'}
      />
    </div>
  )
}
