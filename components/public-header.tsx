'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { FileText, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function PublicHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href) ?? false
  }

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActive(href)
        ? 'text-primary'
        : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary">
          <FileText className="h-6 w-6" />
          LicitaAI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className={navLinkClass('/')}>Início</Link>
          <Link href="/licitacoes" className={navLinkClass('/licitacoes')}>Explorar licitações</Link>
          <Link href="/sobre" className={navLinkClass('/sobre')}>Sobre</Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {session?.user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/cadastro">Cadastrar-se</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              Início
            </Link>
            <Link href="/licitacoes" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              Explorar licitações
            </Link>
            <Link href="/sobre" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              Sobre
            </Link>
            <div className="my-2 border-t" />
            {session?.user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-accent">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  Entrar
                </Link>
                <Link href="/cadastro" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-accent">
                  Cadastrar-se
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
