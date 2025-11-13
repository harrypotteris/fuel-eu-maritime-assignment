import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BankingPage() {
  const balance = 12850 // Example carbon-credit balance

  const transactions = [
    { id: 1, type: "Buy", amount: 500, date: "2025-01-14" },
    { id: 2, type: "Sell", amount: 300, date: "2025-01-10" },
    { id: 3, type: "Buy", amount: 1000, date: "2025-01-06" },
  ]

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Banking</h1>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credit Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-3xl font-semibold">{balance} credits</p>
          
          <div className="flex gap-4">
            <Button className="px-6">Buy Credits</Button>
            <Button variant="secondary" className="px-6">Sell Credits</Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-2">{t.type}</td>
                  <td className="py-2">{t.amount}</td>
                  <td className="py-2">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  )
}
