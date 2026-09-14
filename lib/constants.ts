export const STATUS_LABELS: Record<string, string> = {
  RASCUNHO: 'Rascunho',
  PUBLICADA: 'Publicada',
  EM_ANALISE: 'Em análise',
  EM_ANDAMENTO: 'Em andamento',
  HOMOLOGADA: 'Homologada',
  ENCERRADA: 'Encerrada',
  CANCELADA: 'Cancelada',
}

export const MODALIDADE_LABELS: Record<string, string> = {
  PREGAO_ELETRONICO: 'Pregão Eletrônico',
  CONCORRENCIA: 'Concorrência',
  CONCURSO: 'Concurso',
  LEILAO: 'Leilão',
  DIALOGO_COMPETITIVO: 'Diálogo Competitivo',
  DISPENSA: 'Dispensa',
  INEXIGIBILIDADE: 'Inexigibilidade',
}

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }))
export const MODALIDADE_OPTIONS = Object.entries(MODALIDADE_LABELS).map(([value, label]) => ({ value, label }))

export const ITEMS_PER_PAGE = 10

// Mapa de transições de status permitidas
export const STATUS_TRANSITIONS: Record<string, string[]> = {
  RASCUNHO: ['PUBLICADA', 'CANCELADA'],
  PUBLICADA: ['EM_ANALISE', 'CANCELADA'],
  EM_ANALISE: ['EM_ANDAMENTO', 'CANCELADA'],
  EM_ANDAMENTO: ['HOMOLOGADA', 'CANCELADA'],
  HOMOLOGADA: ['ENCERRADA'],
  ENCERRADA: [],   // terminal
  CANCELADA: [],   // terminal
}

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  USER: 'Usuário',
}
