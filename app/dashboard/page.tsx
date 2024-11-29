import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import prisma from "@/lib/prisma"

async function getDashboardData() {
  const categories = await prisma.category.findMany({
    include: { expenses: true },
  })

  const totalBudget = categories.reduce((sum, category) => sum + Number(category.monthlyBudget), 0)
  const totalExpenses = categories.reduce((sum, category) => 
    sum + category.expenses.reduce((expSum, expense) => expSum + Number(expense.amount), 0), 0)

  return { categories, totalBudget, totalExpenses }
}

export default async function Dashboard() {
  const { categories, totalBudget, totalExpenses } = await getDashboardData()

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Résumé du budget</h2>
              <p>Budget total : {totalBudget.toFixed(2)} €</p>
              <p>Dépenses totales : {totalExpenses.toFixed(2)} €</p>
              <p>Solde : {(totalBudget - totalExpenses).toFixed(2)} €</p>
            </div>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Catégories</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className="mb-2">
                    <span style={{ color: category.color }}>{category.name}</span>: {category.monthlyBudget.toFixed(2)} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

