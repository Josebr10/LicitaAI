import { PublicHeader } from '@/components/public-header'
import { PublicFooter } from '@/components/public-footer'
import {
  FileText,
  Users,
  Target,
  Shield,
  BarChart3,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export const metadata = { title: 'Sobre' }

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Sobre o LicitaAI</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Uma plataforma para encontrar, acompanhar e gerenciar licitações públicas em um só lugar.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <Section
              icon={Target}
              title="O que é o LicitaAI?"
              description="O LicitaAI é uma plataforma de gestão de licitações públicas que centraliza informações, acompanha o andamento dos processos e facilita a organização de todo o fluxo licitatório — da publicação do edital até a homologação."
            />
            <Section
              icon={Users}
              title="Para quem é?"
              description="Profissionais e empresas que lidam com licitações públicas e precisam de organização, agilidade e controle sobre seus processos. Ideal para consultores, pregõeiros, analistas de compras e gestores públicos."
            />
            <Section
              icon={BarChart3}
              title="Qual problema resolve?"
              description="Informações licitatórias frequentemente ficam espalhadas entre documentos, planilhas e diferentes fontes. O LicitaAI elimina essa dispersão, oferecendo uma visão unificada e organizada de todos os processos."
            />
            <Section
              icon={Shield}
              title="Segurança e transparência"
              description="Autenticação segura, controle de acesso por perfil, validação server-side de permissões e isolamento de dados entre usuários garantem a integridade e a confiabilidade da plataforma."
            />
            <Section
              icon={Clock}
              title="Acompanhamento visual"
              description="Cada licitação possui uma timeline de andamento que permite visualizar rapidamente em qual etapa o processo se encontra — da publicação do edital até o encerramento."
            />
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

function Section({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
