'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { Status, Modalidade } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { STATUS_TRANSITIONS } from '@/lib/constants'

interface LicitacaoInput {
  numero: string
  nome: string
  edital: string
  status: string
  verbaLiberada: string
  orgao: string
  objeto: string
  modalidade: string
  valorEstimado: string
  dataPublicacao?: string
  dataAbertura?: string
  observacoes?: string
}

function validateInput(data: LicitacaoInput) {
  const errors: string[] = []
  if (!data.numero?.trim()) errors.push('Número é obrigatório.')
  if (!data.nome?.trim()) errors.push('Nome é obrigatório.')
  if (!data.edital?.trim()) errors.push('Edital é obrigatório.')
  if (!data.orgao?.trim()) errors.push('Órgão é obrigatório.')
  if (!data.objeto?.trim()) errors.push('Objeto é obrigatório.')
  if (!data.status || !Object.values(Status).includes(data.status as Status)) errors.push('Status inválido.')
  if (!data.modalidade || !Object.values(Modalidade).includes(data.modalidade as Modalidade)) errors.push('Modalidade inválida.')

  const vl = parseFloat(data.verbaLiberada)
  if (isNaN(vl) || vl < 0) errors.push('Verba liberada inválida.')
  const ve = parseFloat(data.valorEstimado)
  if (isNaN(ve) || ve < 0) errors.push('Valor estimado inválido.')

  return errors
}

/** Verifica autenticação + ownership. Retorna { error } ou { session, licitacao } */
async function checkOwnership(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Não autenticado.' }

  const licitacao = await prisma.licitacao.findUnique({ where: { id }, select: { id: true, criadoPor: true, status: true } })
  if (!licitacao) return { error: 'Licitação não encontrada.' }

  const isAdmin = session.user.role === 'ADMIN'
  const isOwner = licitacao.criadoPor === session.user.id

  if (!isAdmin && !isOwner) {
    return { error: 'Você não tem permissão para gerenciar esta licitação.' }
  }

  return { session, licitacao, isAdmin, isOwner }
}

export async function createLicitacao(data: LicitacaoInput) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Não autenticado.' }

  const errors = validateInput(data)
  if (errors.length > 0) return { error: errors.join(' ') }

  try {
    const licitacao = await prisma.licitacao.create({
      data: {
        numero: data.numero.trim(),
        nome: data.nome.trim(),
        edital: data.edital.trim(),
        status: data.status as Status,
        verbaLiberada: new Decimal(data.verbaLiberada),
        orgao: data.orgao.trim(),
        objeto: data.objeto.trim(),
        modalidade: data.modalidade as Modalidade,
        valorEstimado: new Decimal(data.valorEstimado),
        dataPublicacao: data.dataPublicacao ? new Date(data.dataPublicacao) : null,
        dataAbertura: data.dataAbertura ? new Date(data.dataAbertura) : null,
        observacoes: data.observacoes?.trim() || null,
        criadoPor: session.user.id, // sempre do servidor
      },
    })
    revalidatePath('/licitacoes')
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/licitacoes')
    return { success: true, id: licitacao.id }
  } catch (error: any) {
    console.error('createLicitacao error:', error)
    return { error: 'Erro ao criar licitação.' }
  }
}

export async function updateLicitacao(id: string, data: LicitacaoInput) {
  const check = await checkOwnership(id)
  if ('error' in check) return { error: check.error }

  const errors = validateInput(data)
  if (errors.length > 0) return { error: errors.join(' ') }

  // Validar transição de status
  const currentStatus = check.licitacao.status
  const newStatus = data.status as Status
  if (currentStatus !== newStatus) {
    const allowed = STATUS_TRANSITIONS[currentStatus] ?? []
    if (!allowed.includes(newStatus)) {
      return { error: `Não é possível alterar o status de "${currentStatus}" para "${newStatus}". Transição não permitida.` }
    }
  }

  try {
    await prisma.licitacao.update({
      where: { id },
      data: {
        numero: data.numero.trim(),
        nome: data.nome.trim(),
        edital: data.edital.trim(),
        status: newStatus,
        verbaLiberada: new Decimal(data.verbaLiberada),
        orgao: data.orgao.trim(),
        objeto: data.objeto.trim(),
        modalidade: data.modalidade as Modalidade,
        valorEstimado: new Decimal(data.valorEstimado),
        dataPublicacao: data.dataPublicacao ? new Date(data.dataPublicacao) : null,
        dataAbertura: data.dataAbertura ? new Date(data.dataAbertura) : null,
        observacoes: data.observacoes?.trim() || null,
      },
    })
    revalidatePath('/licitacoes')
    revalidatePath(`/licitacoes/${id}`)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/licitacoes')
    return { success: true }
  } catch (error: any) {
    console.error('updateLicitacao error:', error)
    return { error: 'Erro ao atualizar licitação.' }
  }
}

export async function deleteLicitacao(id: string) {
  const check = await checkOwnership(id)
  if ('error' in check) return { error: check.error }

  try {
    await prisma.licitacao.delete({ where: { id } })
    revalidatePath('/licitacoes')
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/licitacoes')
    return { success: true }
  } catch (error: any) {
    console.error('deleteLicitacao error:', error)
    return { error: 'Erro ao excluir licitação.' }
  }
}

export async function updateLicitacaoStatus(id: string, newStatus: string) {
  const check = await checkOwnership(id)
  if ('error' in check) return { error: check.error }

  if (!Object.values(Status).includes(newStatus as Status)) {
    return { error: 'Status inválido.' }
  }

  const currentStatus = check.licitacao.status
  const allowed = STATUS_TRANSITIONS[currentStatus] ?? []
  if (!allowed.includes(newStatus)) {
    return { error: `Não é possível alterar o status de "${currentStatus}" para "${newStatus}". Transição não permitida.` }
  }

  try {
    await prisma.licitacao.update({
      where: { id },
      data: { status: newStatus as Status },
    })
    revalidatePath('/licitacoes')
    revalidatePath(`/licitacoes/${id}`)
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/licitacoes')
    return { success: true }
  } catch (error: any) {
    console.error('updateLicitacaoStatus error:', error)
    return { error: 'Erro ao alterar status.' }
  }
}

export interface LicitacoesFilter {
  search?: string
  numero?: string
  status?: string
  modalidade?: string
  orgao?: string
  valorMin?: string
  valorMax?: string
  dataInicio?: string
  dataFim?: string
  page?: string
}

/** Busca pública — retorna TODAS as licitações (sem filtrar por ownership) */
export async function fetchLicitacoes(filters: LicitacoesFilter) {
  const page = Math.max(1, parseInt(filters.page || '1', 10) || 1)
  const perPage = 10
  const skip = (page - 1) * perPage

  const where: any = {}

  if (filters.search?.trim()) {
    const s = filters.search.trim()
    where.OR = [
      { nome: { contains: s, mode: 'insensitive' } },
      { edital: { contains: s, mode: 'insensitive' } },
      { orgao: { contains: s, mode: 'insensitive' } },
      { objeto: { contains: s, mode: 'insensitive' } },
      { numero: { contains: s, mode: 'insensitive' } },
    ]
  }

  if (filters.numero?.trim()) {
    where.numero = { contains: filters.numero.trim(), mode: 'insensitive' }
  }

  if (filters.status && Object.values(Status).includes(filters.status as Status)) {
    where.status = filters.status as Status
  }

  if (filters.modalidade && Object.values(Modalidade).includes(filters.modalidade as Modalidade)) {
    where.modalidade = filters.modalidade as Modalidade
  }

  if (filters.orgao?.trim()) {
    where.orgao = { contains: filters.orgao.trim(), mode: 'insensitive' }
  }

  if (filters.valorMin) {
    const min = parseFloat(filters.valorMin)
    if (!isNaN(min)) where.valorEstimado = { ...(where.valorEstimado ?? {}), gte: new Decimal(min) }
  }

  if (filters.valorMax) {
    const max = parseFloat(filters.valorMax)
    if (!isNaN(max)) where.valorEstimado = { ...(where.valorEstimado ?? {}), lte: new Decimal(max) }
  }

  if (filters.dataInicio) {
    where.dataAbertura = { ...(where.dataAbertura ?? {}), gte: new Date(filters.dataInicio) }
  }

  if (filters.dataFim) {
    where.dataAbertura = { ...(where.dataAbertura ?? {}), lte: new Date(filters.dataFim) }
  }

  const [items, total] = await Promise.all([
    prisma.licitacao.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
      include: { criador: { select: { name: true } } },
    }),
    prisma.licitacao.count({ where }),
  ])

  return {
    items: items.map((item: any) => ({
      ...item,
      verbaLiberada: item.verbaLiberada?.toString() ?? '0',
      valorEstimado: item.valorEstimado?.toString() ?? '0',
      dataPublicacao: item.dataPublicacao?.toISOString() ?? null,
      dataAbertura: item.dataAbertura?.toISOString() ?? null,
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      criadorNome: item.criador?.name ?? null,
    })),
    total,
    page,
    totalPages: Math.ceil(total / perPage),
  }
}

/** Busca isolada para o dashboard — filtra por criadoPor para USER, mostra tudo para ADMIN */
export async function fetchDashboardLicitacoes(filters: LicitacoesFilter) {
  const session = await auth()
  if (!session?.user?.id) return { items: [], total: 0, page: 1, totalPages: 0 }

  const page = Math.max(1, parseInt(filters.page || '1', 10) || 1)
  const perPage = 10
  const skip = (page - 1) * perPage

  const isAdmin = session.user.role === 'ADMIN'
  const where: any = isAdmin ? {} : { criadoPor: session.user.id }

  if (filters.search?.trim()) {
    const s = filters.search.trim()
    where.OR = [
      { nome: { contains: s, mode: 'insensitive' } },
      { edital: { contains: s, mode: 'insensitive' } },
      { orgao: { contains: s, mode: 'insensitive' } },
      { objeto: { contains: s, mode: 'insensitive' } },
      { numero: { contains: s, mode: 'insensitive' } },
    ]
  }

  if (filters.numero?.trim()) {
    if (!where.AND) where.AND = []
    where.AND.push({ numero: { contains: filters.numero.trim(), mode: 'insensitive' } })
  }

  if (filters.status && Object.values(Status).includes(filters.status as Status)) {
    where.status = filters.status as Status
  }

  if (filters.modalidade && Object.values(Modalidade).includes(filters.modalidade as Modalidade)) {
    where.modalidade = filters.modalidade as Modalidade
  }

  if (filters.orgao?.trim()) {
    if (!where.AND) where.AND = []
    where.AND.push({ orgao: { contains: filters.orgao.trim(), mode: 'insensitive' } })
  }

  if (filters.valorMin) {
    const min = parseFloat(filters.valorMin)
    if (!isNaN(min)) where.valorEstimado = { ...(where.valorEstimado ?? {}), gte: new Decimal(min) }
  }

  if (filters.valorMax) {
    const max = parseFloat(filters.valorMax)
    if (!isNaN(max)) where.valorEstimado = { ...(where.valorEstimado ?? {}), lte: new Decimal(max) }
  }

  if (filters.dataInicio) {
    where.dataAbertura = { ...(where.dataAbertura ?? {}), gte: new Date(filters.dataInicio) }
  }

  if (filters.dataFim) {
    where.dataAbertura = { ...(where.dataAbertura ?? {}), lte: new Date(filters.dataFim) }
  }

  const [items, total] = await Promise.all([
    prisma.licitacao.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
      include: { criador: { select: { name: true } } },
    }),
    prisma.licitacao.count({ where }),
  ])

  return {
    items: items.map((item: any) => ({
      ...item,
      verbaLiberada: item.verbaLiberada?.toString() ?? '0',
      valorEstimado: item.valorEstimado?.toString() ?? '0',
      dataPublicacao: item.dataPublicacao?.toISOString() ?? null,
      dataAbertura: item.dataAbertura?.toISOString() ?? null,
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      criadorNome: item.criador?.name ?? null,
    })),
    total,
    page,
    totalPages: Math.ceil(total / perPage),
  }
}

export async function fetchLicitacaoById(id: string) {
  const item = await prisma.licitacao.findUnique({
    where: { id },
    include: { criador: { select: { name: true, email: true, id: true } } },
  })
  if (!item) return null
  return {
    ...item,
    verbaLiberada: item.verbaLiberada?.toString() ?? '0',
    valorEstimado: item.valorEstimado?.toString() ?? '0',
    dataPublicacao: item.dataPublicacao?.toISOString() ?? null,
    dataAbertura: item.dataAbertura?.toISOString() ?? null,
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
    criadorNome: item.criador?.name ?? null,
    criadorId: item.criador?.id ?? null,
  }
}

/** Dashboard data com isolamento por usuário */
export async function fetchDashboardData() {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      total: 0,
      statusCounts: {} as Record<string, number>,
      modalidadeCounts: {} as Record<string, number>,
      recentes: [],
      valorEstimadoTotal: '0',
      verbaLiberadaTotal: '0',
      isAdmin: false,
    }
  }

  const isAdmin = session.user.role === 'ADMIN'
  const whereClause = isAdmin ? {} : { criadoPor: session.user.id }

  const [total, byStatus, byModalidade, recentes, aggregates] = await Promise.all([
    prisma.licitacao.count({ where: whereClause }),
    prisma.licitacao.groupBy({ by: ['status'], _count: { _all: true }, where: whereClause }),
    prisma.licitacao.groupBy({ by: ['modalidade'], _count: { _all: true }, where: whereClause }),
    prisma.licitacao.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { criador: { select: { name: true } } },
    }),
    prisma.licitacao.aggregate({
      _sum: { valorEstimado: true, verbaLiberada: true },
      where: whereClause,
    }),
  ])

  const statusCounts: Record<string, number> = {}
  for (const s of byStatus) {
    statusCounts[s.status] = s._count._all
  }

  const modalidadeCounts: Record<string, number> = {}
  for (const m of byModalidade) {
    modalidadeCounts[m.modalidade] = m._count._all
  }

  return {
    total,
    statusCounts,
    modalidadeCounts,
    recentes: recentes.map((item: any) => ({
      ...item,
      verbaLiberada: item.verbaLiberada?.toString() ?? '0',
      valorEstimado: item.valorEstimado?.toString() ?? '0',
      dataPublicacao: item.dataPublicacao?.toISOString() ?? null,
      dataAbertura: item.dataAbertura?.toISOString() ?? null,
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      criadorNome: item.criador?.name ?? null,
    })),
    valorEstimadoTotal: aggregates._sum.valorEstimado?.toString() ?? '0',
    verbaLiberadaTotal: aggregates._sum.verbaLiberada?.toString() ?? '0',
    isAdmin,
  }
}

export async function fetchOrgaos() {
  const results = await prisma.licitacao.findMany({
    select: { orgao: true },
    distinct: ['orgao'],
    orderBy: { orgao: 'asc' },
  })
  return results.map((r: any) => r.orgao)
}

/** Busca todos os usuários — somente ADMIN */
export async function fetchAllUsers() {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Não autenticado.' }
  if (session.user.role !== 'ADMIN') return { error: 'Sem permissão.' }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { licitacoes: true } },
    },
    orderBy: { createdAt: 'asc' },
  })

  return {
    users: users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt?.toISOString(),
      totalLicitacoes: u._count?.licitacoes ?? 0,
    })),
  }
}

/** Verificar permissão de edição — usada pelas páginas server-side */
export async function checkEditPermission(licitacaoId: string) {
  const session = await auth()
  if (!session?.user?.id) return { allowed: false, reason: 'auth' as const }

  const licitacao = await prisma.licitacao.findUnique({
    where: { id: licitacaoId },
    select: { criadoPor: true },
  })
  if (!licitacao) return { allowed: false, reason: 'not_found' as const }

  const isAdmin = session.user.role === 'ADMIN'
  const isOwner = licitacao.criadoPor === session.user.id

  if (!isAdmin && !isOwner) return { allowed: false, reason: 'forbidden' as const }

  return { allowed: true, reason: 'ok' as const }
}
