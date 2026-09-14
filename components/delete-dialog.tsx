'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { deleteLicitacao } from '@/app/actions/licitacoes'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  redirectTo?: string
}

export function DeleteLicitacaoDialog({ id, open, onOpenChange, redirectTo }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteLicitacao(id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Licitação excluída com sucesso.')
        onOpenChange(false)
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          router.refresh()
        }
      }
    } catch {
      toast.error('Erro ao excluir licitação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir licitação?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. A licitação será removida permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
