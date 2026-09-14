'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { DeleteLicitacaoDialog } from '@/components/delete-dialog'
import { useState } from 'react'

interface Props {
  id: string
  criadorId?: string | null
}

export function LicitacaoDetailActions({ id, criadorId }: Props) {
  const { data: session, status } = useSession()
  const [showDelete, setShowDelete] = useState(false)

  if (status === 'loading') return null
  if (!session?.user) return null

  // Mostrar botões somente para dono ou admin
  const isAdmin = session.user.role === 'ADMIN'
  const isOwner = criadorId ? session.user.id === criadorId : false
  if (!isAdmin && !isOwner) return null

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/dashboard/licitacoes/${id}/editar`}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Link>
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
        <Trash2 className="mr-2 h-4 w-4" />
        Excluir
      </Button>
      <DeleteLicitacaoDialog id={id} open={showDelete} onOpenChange={setShowDelete} redirectTo="/licitacoes" />
    </div>
  )
}
