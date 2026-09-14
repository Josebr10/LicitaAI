'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogIn, UserPlus, Lock } from 'lucide-react'
import Link from 'next/link'

export function AuthRequiredMessage() {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Acesso restrito</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Para interagir com as licitações, faça login ou crie sua conta.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/cadastro"><UserPlus className="mr-2 h-4 w-4" />Criar conta</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
