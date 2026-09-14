'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { FileText, Mail, Lock, LogIn } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Preencha todos os campos.')
      return
    }
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      })
      if (result?.error) {
        toast.error('E-mail ou senha inválidos.')
      } else {
        toast.success('Login realizado com sucesso!')
        router.replace('/dashboard')
      }
    } catch {
      toast.error('Erro ao realizar login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 font-display text-lg font-bold text-primary">
          <FileText className="h-5 w-5" />
          LicitaAI
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">Entrar na sua conta</h1>
            <p className="mt-2 text-sm text-muted-foreground">Informe suas credenciais para acessar o sistema.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="font-medium text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
