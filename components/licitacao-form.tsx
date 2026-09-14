'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { STATUS_OPTIONS, MODALIDADE_OPTIONS, STATUS_TRANSITIONS } from '@/lib/constants'
import { createLicitacao, updateLicitacao } from '@/app/actions/licitacoes'
import { toast } from 'sonner'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  mode: 'create' | 'edit'
  initialData?: any
  id?: string
}

export function LicitacaoForm({ mode, initialData, id }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const currentStatus = initialData?.status ?? 'RASCUNHO'
  const [form, setForm] = useState({
    numero: initialData?.numero ?? '',
    nome: initialData?.nome ?? '',
    edital: initialData?.edital ?? '',
    status: currentStatus,
    verbaLiberada: initialData?.verbaLiberada ?? '0',
    orgao: initialData?.orgao ?? '',
    objeto: initialData?.objeto ?? '',
    modalidade: initialData?.modalidade ?? 'PREGAO_ELETRONICO',
    valorEstimado: initialData?.valorEstimado ?? '0',
    dataPublicacao: initialData?.dataPublicacao ? initialData.dataPublicacao.split('T')[0] : '',
    dataAbertura: initialData?.dataAbertura ? initialData.dataAbertura.split('T')[0] : '',
    observacoes: initialData?.observacoes ?? '',
  })

  const update = (field: string, value: string) => setForm({ ...form, [field]: value })

  // Para edição, mostrar apenas transições válidas + status atual
  const allowedStatuses = mode === 'edit'
    ? STATUS_OPTIONS.filter(s => s.value === currentStatus || (STATUS_TRANSITIONS[currentStatus] ?? []).includes(s.value))
    : STATUS_OPTIONS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result: any
      if (mode === 'create') {
        result = await createLicitacao(form)
      } else {
        result = await updateLicitacao(id!, form)
      }

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(mode === 'create' ? 'Licitação criada com sucesso!' : 'Licitação atualizada com sucesso!')
        router.push('/dashboard/licitacoes')
        router.refresh()
      }
    } catch {
      toast.error('Erro ao salvar licitação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/licitacoes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-xl">
            {mode === 'create' ? 'Nova licitação' : 'Editar licitação'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Número *</Label>
                <Input className="mt-1" value={form.numero} onChange={(e: any) => update('numero', e.target.value)} placeholder="Ex: 001/2026" required />
              </div>
              <div>
                <Label>Edital *</Label>
                <Input className="mt-1" value={form.edital} onChange={(e: any) => update('edital', e.target.value)} placeholder="Ex: PE 001/2026" required />
              </div>
            </div>

            <div>
              <Label>Nome *</Label>
              <Input className="mt-1" value={form.nome} onChange={(e: any) => update('nome', e.target.value)} placeholder="Nome da licitação" required />
            </div>

            <div>
              <Label>Órgão *</Label>
              <Input className="mt-1" value={form.orgao} onChange={(e: any) => update('orgao', e.target.value)} placeholder="Órgão responsável" required />
            </div>

            <div>
              <Label>Objeto *</Label>
              <Textarea className="mt-1" rows={3} value={form.objeto} onChange={(e: any) => update('objeto', e.target.value)} placeholder="Descrição do objeto da licitação" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Status *</Label>
                <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.status} onChange={(e: any) => update('status', e.target.value)}>
                  {allowedStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                {mode === 'edit' && (STATUS_TRANSITIONS[currentStatus] ?? []).length === 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">Este status é terminal e não pode ser alterado.</p>
                )}
              </div>
              <div>
                <Label>Modalidade *</Label>
                <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" value={form.modalidade} onChange={(e: any) => update('modalidade', e.target.value)}>
                  {MODALIDADE_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Valor estimado (R$) *</Label>
                <Input className="mt-1" type="number" step="0.01" min="0" value={form.valorEstimado} onChange={(e: any) => update('valorEstimado', e.target.value)} required />
              </div>
              <div>
                <Label>Verba liberada (R$) *</Label>
                <Input className="mt-1" type="number" step="0.01" min="0" value={form.verbaLiberada} onChange={(e: any) => update('verbaLiberada', e.target.value)} required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Data de publicação</Label>
                <Input className="mt-1" type="date" value={form.dataPublicacao} onChange={(e: any) => update('dataPublicacao', e.target.value)} />
              </div>
              <div>
                <Label>Data de abertura</Label>
                <Input className="mt-1" type="date" value={form.dataAbertura} onChange={(e: any) => update('dataAbertura', e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea className="mt-1" rows={3} value={form.observacoes} onChange={(e: any) => update('observacoes', e.target.value)} placeholder="Observações adicionais (opcional)" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/licitacoes">Cancelar</Link>
              </Button>
              <Button type="submit" loading={loading}>
                <Save className="mr-2 h-4 w-4" />
                {mode === 'create' ? 'Criar licitação' : 'Salvar alterações'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
