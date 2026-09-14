export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, confirmPassword } = body ?? {}

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 })
    }

    const trimmedEmail = String(email).toLowerCase().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    if (String(password).length < 8) {
      return NextResponse.json({ error: 'A senha deve ter no mínimo 8 caracteres.' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'As senhas não coincidem.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } })
    if (existing) {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(String(password), 12)

    // Cadastro PÚBLICO sempre cria USER — nunca aceitar role do cliente
    await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: trimmedEmail,
        password: hashedPassword,
        role: 'USER',
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
