'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { FileText, Mail, Lock, User, UserPlus } from 'lucide-react'

export function CadastroForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Preencha todos os campos.')
      return
    }
    if (form.password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (form.password !== form.confirmPassword) {
      toast.error('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error || 'Erro ao criar conta.')
        return
      }

      // Auto login after signup
      const loginResult = await signIn('credentials', {
        email: form.email.toLowerCase().trim(),
        password: form.password,
        redirect: false,
      })

      if (loginResult?.error) {
        toast.success('Conta criada! Faça login para continuar.')
        router.push('/login')
      } else {
        toast.success('Conta criada com sucesso!')
        router.replace('/dashboard')
      }
    } catch {
      toast.error('Erro ao criar conta.')
    } finally {
      setLoading(false)
    }
  }

  const update = (field: string, value: string) => setForm({ ...form, [field]: value })

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
            <h1 className="font-display text-2xl font-bold tracking-tight">Criar sua conta</h1>
            <p className="mt-2 text-sm text-muted-foreground">Preencha os dados abaixo para se cadastrar.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(e: any) => update('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e: any) => update('email', e.target.value)}
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
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={(e: any) => update('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repita a senha"
                  value={form.confirmPassword}
                  onChange={(e: any) => update('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              <UserPlus className="mr-2 h-4 w-4" />
              Criar conta
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
