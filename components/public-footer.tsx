import Link from 'next/link'
import { FileText } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4 text-primary" />
          <span className="font-display font-semibold text-foreground">LicitaAI</span>
        </div>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/sobre" className="transition-colors hover:text-foreground">Sobre</Link>
          <Link href="/licitacoes" className="transition-colors hover:text-foreground">Licitações</Link>
        </nav>
        <p className="text-xs text-muted-foreground">© 2024 LicitaAI. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
