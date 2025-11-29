import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/client/components/theme-toggle'

/**
 * Public layout for landing and auth pages
 * Provides simple header and footer for public pages
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple Header */}
      <header className="border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Vite Flare Starter
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-6xl px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Vite Flare Starter. MIT Licensed.</p>
        </div>
      </footer>
    </div>
  )
}
