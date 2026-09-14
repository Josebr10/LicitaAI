import { LoginForm } from '@/components/login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Entrar' }

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return <LoginForm />
}
