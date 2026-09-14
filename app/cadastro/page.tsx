import { CadastroForm } from '@/components/cadastro-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Criar conta' }

export default async function CadastroPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return <CadastroForm />
}
