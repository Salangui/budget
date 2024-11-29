import { Header } from "@/components/header"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Bienvenue sur Budget Familial</h1>
        <p className="mb-4">Gérez facilement vos finances familiales avec notre application intuitive.</p>
        <Link href="/dashboard" className="bg-primary text-primary-foreground px-4 py-2 rounded">
          Accéder au tableau de bord
        </Link>
      </main>
    </div>
  )
}

