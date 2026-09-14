import { PublicHeader } from '@/components/public-header'
import { PublicFooter } from '@/components/public-footer'
import { fetchLicitacoes, fetchOrgaos, type LicitacoesFilter } from '@/app/actions/licitacoes'
import { LicitacoesListClient } from '@/components/licitacoes-list-client'
import { Search } from 'lucide-react'

export const metadata = { title: 'Explorar Licitações' }

export default async function LicitacoesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const filters: LicitacoesFilter = {
    search: typeof sp?.search === 'string' ? sp.search : undefined,
    numero: typeof sp?.numero === 'string' ? sp.numero : undefined,
    status: typeof sp?.status === 'string' ? sp.status : undefined,
    modalidade: typeof sp?.modalidade === 'string' ? sp.modalidade : undefined,
    orgao: typeof sp?.orgao === 'string' ? sp.orgao : undefined,
    valorMin: typeof sp?.valorMin === 'string' ? sp.valorMin : undefined,
    valorMax: typeof sp?.valorMax === 'string' ? sp.valorMax : undefined,
    dataInicio: typeof sp?.dataInicio === 'string' ? sp.dataInicio : undefined,
    dataFim: typeof sp?.dataFim === 'string' ? sp.dataFim : undefined,
    page: typeof sp?.page === 'string' ? sp.page : '1',
  }

  const [result, orgaos] = await Promise.all([
    fetchLicitacoes(filters),
    fetchOrgaos(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight">Explorar licitações</h1>
                <p className="text-sm text-muted-foreground">Consulte, pesquise e filtre processos licitatórios.</p>
              </div>
            </div>
          </div>
          <LicitacoesListClient
            items={result?.items ?? []}
            total={result?.total ?? 0}
            page={result?.page ?? 1}
            totalPages={result?.totalPages ?? 0}
            filters={filters}
            orgaos={orgaos ?? []}
          />
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
