'use server'

import { prisma } from '@/lib/db'

export async function fetchLandingData() {
  try {
    const [totalLicitacoes, totalUsuarios, recentes] = await Promise.all([
      prisma.licitacao.count(),
      prisma.user.count(),
      prisma.licitacao.findMany({
        where: { status: { not: 'RASCUNHO' } },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          id: true,
          numero: true,
          nome: true,
          orgao: true,
          status: true,
          modalidade: true,
          valorEstimado: true,
          dataAbertura: true,
          objeto: true,
        },
      }),
    ])

    return {
      totalLicitacoes,
      totalUsuarios,
      recentes: recentes.map((item: any) => ({
        ...item,
        valorEstimado: item.valorEstimado?.toString() ?? '0',
        dataAbertura: item.dataAbertura?.toISOString() ?? null,
      })),
    }
  } catch (error: any) {
    console.error('fetchLandingData error:', error)
    return { totalLicitacoes: 0, totalUsuarios: 0, recentes: [] }
  }
}
