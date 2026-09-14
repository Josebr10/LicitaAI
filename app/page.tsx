import Link from 'next/link'
import { PublicHeader } from '@/components/public-header'
import { PublicFooter } from '@/components/public-footer'
import { Button } from '@/components/ui/button'
import { fetchLandingData } from '@/app/actions/landing'
import { LandingHeroMockup } from '@/components/landing-hero-mockup'
import { LandingFlowTimeline } from '@/components/landing-flow-timeline'
import { LandingLicitacoesPreview } from '@/components/landing-licitacoes-preview'
import {
  Search,
  ArrowRight,
  FileSearch,
  ClipboardList,
  TrendingUp,
  FolderCog,
  FileText,
  AlertTriangle,
  Target,
  Layers,
  Users,
  BarChart3,
} from 'lucide-react'

export default async function HomePage() {
  const data = await fetchLandingData()

  const steps = [
    {
      icon: FileSearch,
      number: '01',
      title: 'Encontre',
      description: 'Explore licitações disponíveis por modalidade, órgão ou status.',
    },
    {
      icon: ClipboardList,
      number: '02',
      title: 'Analise',
      description: 'Consulte edital, objeto, valores, órgão e prazos de cada processo.',
    },
    {
      icon: TrendingUp,
      number: '03',
      title: 'Acompanhe',
      description: 'Visualize o andamento do processo com a timeline de etapas.',
    },
    {
      icon: FolderCog,
      number: '04',
      title: 'Gerencie',
      description: 'Cadastre e gerencie suas próprias licitações em um só lugar.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden px-4 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <FileText className="h-4 w-4 text-primary" />
              Plataforma de gestão de licitações
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Gestão de licitações,{' '}
              <span className="text-primary">do edital à homologação.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Acompanhe cada etapa do processo licitatório, gerencie sua equipe e nunca perca um prazo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/cadastro">
                  Começar gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/licitacoes">
                  <Search className="mr-2 h-4 w-4" />
                  Explorar licitações
                </Link>
              </Button>
            </div>
          </div>

          {/* Mockup visual */}
          <div className="w-full max-w-md lg:max-w-lg">
            <LandingHeroMockup />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t bg-muted/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">Como funciona</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Em poucos passos, tenha controle total sobre seus processos licitatórios.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-md" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <span className="font-display text-3xl font-bold text-primary/30">{step.number}</span>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fluxo licitatório */}
      <section className="border-t px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">Fluxo licitatório</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Acompanhe visualmente cada etapa do processo — da publicação do edital até o encerramento.
            </p>
          </div>
          <div className="mt-12">
            <LandingFlowTimeline />
          </div>
        </div>
      </section>

      {/* Explore licitações */}
      <section className="border-t bg-muted/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Explore licitações</h2>
              <p className="mt-2 text-muted-foreground">Processos licitatórios cadastrados na plataforma.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/licitacoes">
                Ver todas as licitações
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <LandingLicitacoesPreview items={data?.recentes ?? []} />
        </div>
      </section>

      {/* Sobre a plataforma */}
      <section className="border-t px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Sobre a plataforma
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">O problema</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Informações licitatórias espalhadas entre documentos, planilhas e diferentes fontes. Prazos perdidos, dados desatualizados e falta de visibilidade sobre o andamento dos processos.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">A solução</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      O LicitaAI centraliza todas as informações em uma única plataforma, oferecendo timeline visual, filtros avançados e gestão colaborativa de processos licitatórios.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">O objetivo</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Tornar o acompanhamento de licitações mais organizado, visual e simples — substituindo planilhas dispersas e controles manuais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-6 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold tabular-nums text-primary">{data?.totalLicitacoes ?? 0}</p>
                <p className="mt-1 text-sm text-muted-foreground">Processos cadastrados</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold tabular-nums text-primary">{data?.totalUsuarios ?? 0}</p>
                <p className="mt-1 text-sm text-muted-foreground">Usuários ativos</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold tabular-nums text-primary">7</p>
                <p className="mt-1 text-sm text-muted-foreground">Status controlados</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold tabular-nums text-primary">7</p>
                <p className="mt-1 text-sm text-muted-foreground">Modalidades suportadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center sm:p-10" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <h2 className="font-display text-2xl font-bold tracking-tight">Pronto para começar?</h2>
          <p className="mt-2 text-muted-foreground">
            Crie sua conta gratuitamente e comece a gerenciar seus processos licitatórios.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/cadastro">
                Começar gratuitamente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/licitacoes">
                <Search className="mr-2 h-4 w-4" />
                Explorar licitações
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
