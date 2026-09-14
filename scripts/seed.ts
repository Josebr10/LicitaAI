import { PrismaClient, Status, Modalidade } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const licitacoes = [
  { numero: '001/2026', nome: 'Aquisição de equipamentos de informática', edital: 'PE 001/2026', status: 'PUBLICADA' as Status, verbaLiberada: 450000, orgao: 'Ministério da Educação', objeto: 'Aquisição de 500 computadores desktop para escolas públicas federais.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 500000, dataPublicacao: '2026-01-15', dataAbertura: '2026-02-10', observacoes: 'Entrega em lotes conforme cronograma do edital.' },
  { numero: '002/2026', nome: 'Reforma do prédio administrativo', edital: 'CC 002/2026', status: 'EM_ANDAMENTO' as Status, verbaLiberada: 1200000, orgao: 'Prefeitura de São Paulo', objeto: 'Reforma completa do prédio sede da administração municipal, incluindo instalações elétricas e hidráulicas.', modalidade: 'CONCORRENCIA' as Modalidade, valorEstimado: 1500000, dataPublicacao: '2026-02-01', dataAbertura: '2026-03-15', observacoes: 'Prazo de execução: 12 meses.' },
  { numero: '003/2026', nome: 'Serviços de limpeza predial', edital: 'PE 003/2026', status: 'HOMOLOGADA' as Status, verbaLiberada: 320000, orgao: 'Tribunal Regional do Trabalho', objeto: 'Contratação de empresa para serviços contínuos de limpeza e conservação predial.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 360000, dataPublicacao: '2026-01-20', dataAbertura: '2026-02-20', observacoes: 'Contrato de 12 meses, prorrogável.' },
  { numero: '004/2026', nome: 'Construção de ponte sobre o Rio Tietê', edital: 'CC 004/2026', status: 'EM_ANALISE' as Status, verbaLiberada: 0, orgao: 'DNIT', objeto: 'Construção de ponte em concreto armado com 200m de extensão.', modalidade: 'CONCORRENCIA' as Modalidade, valorEstimado: 8500000, dataPublicacao: '2026-03-01', dataAbertura: '2026-04-15', observacoes: null },
  { numero: '005/2026', nome: 'Fornecimento de medicamentos', edital: 'PE 005/2026', status: 'PUBLICADA' as Status, verbaLiberada: 780000, orgao: 'Secretaria Estadual de Saúde - MG', objeto: 'Aquisição de medicamentos para unidades básicas de saúde.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 950000, dataPublicacao: '2026-03-10', dataAbertura: '2026-04-05', observacoes: 'Entrega parcelada em 6 meses.' },
  { numero: '006/2026', nome: 'Projeto de identidade visual', edital: 'CS 006/2026', status: 'ENCERRADA' as Status, verbaLiberada: 85000, orgao: 'Governo do Estado do Paraná', objeto: 'Desenvolvimento de identidade visual e material gráfico institucional.', modalidade: 'CONCURSO' as Modalidade, valorEstimado: 85000, dataPublicacao: '2026-01-05', dataAbertura: '2026-01-30', observacoes: 'Premiacao ao vencedor.' },
  { numero: '007/2026', nome: 'Alienação de veículos inservíveis', edital: 'LE 007/2026', status: 'CANCELADA' as Status, verbaLiberada: 0, orgao: 'Polícia Militar de Minas Gerais', objeto: 'Leilão de 45 veículos inservíveis diversos.', modalidade: 'LEILAO' as Modalidade, valorEstimado: 120000, dataPublicacao: '2026-02-15', dataAbertura: '2026-03-10', observacoes: 'Cancelado por ausência de interessados.' },
  { numero: '008/2026', nome: 'PPP - Terminal rodoviário', edital: 'DC 008/2026', status: 'EM_ANDAMENTO' as Status, verbaLiberada: 5000000, orgao: 'Prefeitura de Curitiba', objeto: 'Parceria público-privada para construção e operação de terminal rodoviário.', modalidade: 'DIALOGO_COMPETITIVO' as Modalidade, valorEstimado: 25000000, dataPublicacao: '2026-01-10', dataAbertura: '2026-03-01', observacoes: 'Concessão por 30 anos.' },
  { numero: '009/2026', nome: 'Manutenção de ar condicionado', edital: 'DI 009/2026', status: 'HOMOLOGADA' as Status, verbaLiberada: 28000, orgao: 'Câmara Municipal de Recife', objeto: 'Manutenção preventiva e corretiva de aparelhos de ar condicionado.', modalidade: 'DISPENSA' as Modalidade, valorEstimado: 30000, dataPublicacao: '2026-04-01', dataAbertura: '2026-04-10', observacoes: null },
  { numero: '010/2026', nome: 'Consultoria jurídica especializada', edital: 'IN 010/2026', status: 'RASCUNHO' as Status, verbaLiberada: 0, orgao: 'Ministério Público Federal', objeto: 'Contratação de consultoria jurídica para pareceres em licitações internacionais.', modalidade: 'INEXIGIBILIDADE' as Modalidade, valorEstimado: 200000, dataPublicacao: null, dataAbertura: null, observacoes: 'Notória especialização.' },
  { numero: '011/2026', nome: 'Aquisição de mobiliário escolar', edital: 'PE 011/2026', status: 'PUBLICADA' as Status, verbaLiberada: 210000, orgao: 'Secretaria Municipal de Educação - RJ', objeto: 'Aquisição de 2.000 conjuntos de carteiras e cadeiras escolares.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 250000, dataPublicacao: '2026-04-15', dataAbertura: '2026-05-10', observacoes: null },
  { numero: '012/2026', nome: 'Pavimentação urbana - Zona Norte', edital: 'CC 012/2026', status: 'EM_ANALISE' as Status, verbaLiberada: 0, orgao: 'Prefeitura de Belo Horizonte', objeto: 'Pavimentação asfáltica em 15 km de vias na Zona Norte.', modalidade: 'CONCORRENCIA' as Modalidade, valorEstimado: 4200000, dataPublicacao: '2026-05-01', dataAbertura: '2026-06-15', observacoes: 'Inclui drenagem pluvial.' },
  { numero: '013/2026', nome: 'Serviços de vigilância patrimonial', edital: 'PE 013/2026', status: 'EM_ANDAMENTO' as Status, verbaLiberada: 540000, orgao: 'Universidade Federal de Goiás', objeto: 'Contratação de vigilância 24h para 3 câmpus.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 600000, dataPublicacao: '2026-02-20', dataAbertura: '2026-03-20', observacoes: 'Armada e desarmada.' },
  { numero: '014/2026', nome: 'Aquisição de ambulancias', edital: 'PE 014/2026', status: 'HOMOLOGADA' as Status, verbaLiberada: 1800000, orgao: 'SAMU - Salvador', objeto: 'Aquisição de 10 ambulâncias tipo D (UTI móvel).', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 2000000, dataPublicacao: '2026-03-05', dataAbertura: '2026-04-01', observacoes: null },
  { numero: '015/2026', nome: 'Sistema de gestão acadêmica', edital: 'PE 015/2026', status: 'RASCUNHO' as Status, verbaLiberada: 0, orgao: 'Instituto Federal do Ceará', objeto: 'Desenvolvimento e implantação de sistema integrado de gestão acadêmica.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 750000, dataPublicacao: null, dataAbertura: null, observacoes: 'Em elaboração de termo de referência.' },
  { numero: '016/2026', nome: 'Reforma de quadra poliesportiva', edital: 'CC 016/2026', status: 'ENCERRADA' as Status, verbaLiberada: 380000, orgao: 'Prefeitura de Porto Alegre', objeto: 'Reforma completa da quadra poliesportiva do Parque Marinha.', modalidade: 'CONCORRENCIA' as Modalidade, valorEstimado: 400000, dataPublicacao: '2025-11-10', dataAbertura: '2025-12-15', observacoes: 'Obra concluída em março/2026.' },
  { numero: '017/2026', nome: 'Fornecimento de merenda escolar', edital: 'PE 017/2026', status: 'PUBLICADA' as Status, verbaLiberada: 920000, orgao: 'Secretaria Estadual de Educação - BA', objeto: 'Fornecimento de alimentação escolar para 200 escolas estaduais.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 1100000, dataPublicacao: '2026-05-20', dataAbertura: '2026-06-20', observacoes: 'Inclui itens da agricultura familiar.' },
  { numero: '018/2026', nome: 'Locação de veículos executivos', edital: 'PE 018/2026', status: 'EM_ANALISE' as Status, verbaLiberada: 0, orgao: 'Tribunal de Justiça do Amazonas', objeto: 'Locação de 20 veículos sedan executivos com motorista.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 480000, dataPublicacao: '2026-06-01', dataAbertura: '2026-07-01', observacoes: null },
  { numero: '019/2026', nome: 'Construção de creche municipal', edital: 'CC 019/2026', status: 'EM_ANDAMENTO' as Status, verbaLiberada: 650000, orgao: 'Prefeitura de Florianópolis', objeto: 'Construção de creche com capacidade para 120 crianças.', modalidade: 'CONCORRENCIA' as Modalidade, valorEstimado: 1200000, dataPublicacao: '2026-02-28', dataAbertura: '2026-04-10', observacoes: 'Recurso do Fundeb.' },
  { numero: '020/2026', nome: 'Serviços de telecom e internet', edital: 'PE 020/2026', status: 'CANCELADA' as Status, verbaLiberada: 0, orgao: 'Agência Nacional de Telecomunicações', objeto: 'Contratação de links dedicados de internet para 50 unidades.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 360000, dataPublicacao: '2026-04-10', dataAbertura: '2026-05-05', observacoes: 'Cancelado para revisão do termo de referência.' },
  { numero: '021/2026', nome: 'Aquisição de EPIs hospitalares', edital: 'PE 021/2026', status: 'HOMOLOGADA' as Status, verbaLiberada: 190000, orgao: 'Hospital Universitário de Brasília', objeto: 'Aquisição de equipamentos de proteção individual para equipe de saúde.', modalidade: 'PREGAO_ELETRONICO' as Modalidade, valorEstimado: 200000, dataPublicacao: '2026-05-15', dataAbertura: '2026-06-10', observacoes: null },
  { numero: '022/2026', nome: 'Venda de imóvel público', edital: 'LE 022/2026', status: 'ENCERRADA' as Status, verbaLiberada: 950000, orgao: 'Governo do Estado de SP', objeto: 'Alienação de imóvel comercial na Av. Paulista, 1500m².', modalidade: 'LEILAO' as Modalidade, valorEstimado: 850000, dataPublicacao: '2026-03-20', dataAbertura: '2026-04-20', observacoes: 'Arrematado acima do valor mínimo.' },
  { numero: '023/2026', nome: 'Reparo de elevadores', edital: 'DI 023/2026', status: 'RASCUNHO' as Status, verbaLiberada: 0, orgao: 'Fórum Central de Manaus', objeto: 'Manutenção corretiva emergencial de 4 elevadores.', modalidade: 'DISPENSA' as Modalidade, valorEstimado: 45000, dataPublicacao: null, dataAbertura: null, observacoes: 'Dispensa por emergência.' },
  { numero: '024/2026', nome: 'Capacitação de servidores', edital: 'IN 024/2026', status: 'EM_ANDAMENTO' as Status, verbaLiberada: 120000, orgao: 'Escola Nacional de Administração Pública', objeto: 'Contratação de curso de MBA em Gestão Pública para 30 servidores.', modalidade: 'INEXIGIBILIDADE' as Modalidade, valorEstimado: 150000, dataPublicacao: '2026-06-10', dataAbertura: '2026-07-01', observacoes: 'Instituição com exclusividade.' },
  { numero: '025/2026', nome: 'Implantação de energia solar', edital: 'DC 025/2026', status: 'PUBLICADA' as Status, verbaLiberada: 0, orgao: 'Prefeitura de Vitória', objeto: 'Implantação de sistema fotovoltaico em 10 prédios públicos.', modalidade: 'DIALOGO_COMPETITIVO' as Modalidade, valorEstimado: 3200000, dataPublicacao: '2026-07-01', dataAbertura: '2026-08-15', observacoes: 'Programa de sustentabilidade municipal.' },
]

async function main() {
  console.log('Seeding database...')

  // Hidden test account (role = USER)
  const testHash = await bcrypt.hash('4upV*D6Zbm', 12)
  await prisma.user.upsert({
    where: { email: 'abacus-206fddd3@example.com' },
    update: { role: 'USER' },
    create: {
      name: 'Administrador Teste',
      email: 'abacus-206fddd3@example.com',
      password: testHash,
      role: 'USER',
    },
  })

  // Demo account (ADMIN — única conta administradora)
  const demoHash = await bcrypt.hash('Demo@123', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@licitaai.com.br' },
    update: { role: 'ADMIN' },
    create: {
      name: 'Administrador',
      email: 'demo@licitaai.com.br',
      password: demoHash,
      role: 'ADMIN',
    },
  })

  console.log('Users seeded.')

  // Seed licitações atribuídas ao ADMIN
  for (const lic of licitacoes) {
    await prisma.licitacao.upsert({
      where: { id: `seed-${lic.numero.replace(/\//g, '-')}` },
      update: { criadoPor: demoUser.id },
      create: {
        id: `seed-${lic.numero.replace(/\//g, '-')}`,
        numero: lic.numero,
        nome: lic.nome,
        edital: lic.edital,
        status: lic.status,
        verbaLiberada: lic.verbaLiberada,
        orgao: lic.orgao,
        objeto: lic.objeto,
        modalidade: lic.modalidade,
        valorEstimado: lic.valorEstimado,
        dataPublicacao: lic.dataPublicacao ? new Date(lic.dataPublicacao) : null,
        dataAbertura: lic.dataAbertura ? new Date(lic.dataAbertura) : null,
        observacoes: lic.observacoes,
        criadoPor: demoUser.id,
      },
    })
  }

  // Atualizar qualquer usuário existente que não seja o admin para role USER
  await prisma.user.updateMany({
    where: {
      email: { notIn: ['demo@licitaai.com.br'] },
      role: 'ADMIN',
    },
    data: { role: 'USER' },
  })

  console.log(`${licitacoes.length} licitações seeded.`)
  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
