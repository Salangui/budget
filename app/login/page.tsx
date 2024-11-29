"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authenticate, generatePassword } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(email)
    if (newPassword) {
      setGeneratedPassword(newPassword)
      setPassword(newPassword)
    } else {
      setError("Email non reconnu")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = authenticate(email, password)
    if (user) {
      router.push("/dashboard")
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Connexion à votre compte</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Mot de passe</label>
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-900"
              >
                Générer un mot de passe
              </button>
              <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Connexion</button>
            </div>
          </div>
        </form>
        {generatedPassword && (
          <p className="mt-4 text-green-600">Nouveau mot de passe généré : {generatedPassword}</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  )
}

