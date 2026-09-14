'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  LayoutDashboard,
  List,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Users,
  Shield,
  Compass,
  Home,
} from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  children: React.ReactNode
  userName: string
  userEmail: string
  userRole: string
}

export function DashboardShell({ children, userName, userEmail, userRole }: Props) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isAdmin = userRole === 'ADMIN'

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/licitacoes', label: 'Minhas licitações', icon: List },
    { href: '/dashboard/licitacoes/nova', label: 'Nova licitação', icon: PlusCircle },
    ...(isAdmin ? [{ href: '/dashboard/usuarios', label: 'Usuários', icon: Users }] : []),
    { href: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
  ]

  const quickLinks = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/licitacoes', label: 'Explorar licitações', icon: Compass },
  ]

  const handleLogout = () => {
    signOut({ redirectTo: '/' })
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname?.startsWith(href) ?? false
  }

  const NavLink = ({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) => (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
        isActive(item.href)
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - desktop */}
      <aside className="hidden w-60 flex-col border-r bg-card lg:flex">
        <div className="flex h-14 items-center gap-2 border-b px-5">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-display text-base font-bold tracking-tight text-primary">LicitaAI</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {navItems.map((item) => <NavLink key={item.href} item={item} />)}
          <div className="my-2 border-t" />
          <p className="px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Acesso rápido</p>
          {quickLinks.map((item) => <NavLink key={item.href} item={item} />)}
        </nav>
        <div className="border-t p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-60 bg-card shadow-lg">
            <div className="flex h-14 items-center justify-between border-b px-5">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-display text-base font-bold text-primary">LicitaAI</span>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex flex-col gap-0.5 p-3">
              {navItems.map((item) => <NavLink key={item.href} item={item} onClick={() => setSidebarOpen(false)} />)}
              <div className="my-2 border-t" />
              <p className="px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Acesso rápido</p>
              {quickLinks.map((item) => <NavLink key={item.href} item={item} onClick={() => setSidebarOpen(false)} />)}
              <div className="my-2 border-t" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b bg-card px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {isAdmin ? 'Administrador' : 'Usuário'}
                    </p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground" suppressHydrationWarning>{userEmail}</p>
                  <Badge variant={isAdmin ? 'default' : 'secondary'} className="mt-1 text-[10px]">
                    {isAdmin ? 'Administrador' : 'Usuário'}
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
