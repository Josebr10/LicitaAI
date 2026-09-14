'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Send,
  Scale,
  UserCheck,
  MessageSquare,
  CheckCircle2,
  Lock,
} from 'lucide-react'

const FLOW_STEPS = [
  {
    icon: FileText,
    title: 'Edital',
    description: 'Publicação do edital com todas as regras, prazos e requisitos do processo licitatório.',
  },
  {
    icon: Send,
    title: 'Propostas',
    description: 'Período para recebimento das propostas comerciais e técnicas dos participantes.',
  },
  {
    icon: Scale,
    title: 'Julgamento',
    description: 'Análise e classificação das propostas conforme os critérios estabelecidos no edital.',
  },
  {
    icon: UserCheck,
    title: 'Habilitação',
    description: 'Verificação da documentação e capacidade técnica/financeira dos licitantes.',
  },
  {
    icon: MessageSquare,
    title: 'Recursos',
    description: 'Prazo para interposição de recursos administrativos pelos participantes do certame.',
  },
  {
    icon: CheckCircle2,
    title: 'Homologação',
    description: 'Aprovação oficial do resultado pela autoridade competente do órgão contratante.',
  },
  {
    icon: Lock,
    title: 'Encerramento',
    description: 'Conclusão do processo licitatório e assinatura do contrato com o vencedor.',
  },
]

export function LandingFlowTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between">
          {/* Line */}
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-border" />
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative z-10 flex w-32 flex-col items-center text-center cursor-pointer"
              onHoverStart={() => setActiveIndex(i)}
              onHoverEnd={() => setActiveIndex(null)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                  activeIndex === i
                    ? 'border-primary bg-primary text-primary-foreground scale-110'
                    : 'border-border bg-card text-muted-foreground'
                }`}
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <h4 className={`mt-3 text-sm font-semibold transition-colors ${
                activeIndex === i ? 'text-primary' : ''
              }`}>
                {step.title}
              </h4>
              <motion.p
                className="mt-1 text-xs leading-relaxed text-muted-foreground"
                initial={{ opacity: 0, height: 0 }}
                animate={activeIndex === i ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="space-y-0 lg:hidden">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <step.icon className="h-4 w-4" />
              </div>
              {i < FLOW_STEPS.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
            </div>
            <div className="pb-6">
              <h4 className="text-sm font-semibold">{step.title}</h4>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
