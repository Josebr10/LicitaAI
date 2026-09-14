export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body ?? {}

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 })
    }

    const trimmedEmail = String(email).toLowerCase().trim()
    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } })
    if (!user) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(String(password), user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 })
    }

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
