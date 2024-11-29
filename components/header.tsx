"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { getUser, logout } from '@/lib/auth'

export function Header() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Budget Familial
        </Link>
        <nav className="space-x-4">
          <Link href="/dashboard">Tableau de bord</Link>
          <Link href="/categories">Catégories</Link>
          <Link href="/expenses">Dépenses</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <Button onClick={handleLogout}>Déconnexion</Button>
          ) : (
            <Link href="/login">
              <Button>Connexion</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

