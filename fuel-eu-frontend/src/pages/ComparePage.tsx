import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ComparePage() {
  const routes = [
    {
      id: 1,
      name: "Route A",
      distance: "120 km",
      fuel: "45 L",
      emissions: "118 kg CO₂",
      cost: "₹ 4,500"
    },
    {
      id: 2,
      name: "Route B",
      distance: "110 km",
      fuel: "38 L",
      emissions: "100 kg CO₂",
      cost: "₹ 3,900"
    }
  ]

  const best = routes[1] // highlight lowest emissions route

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Compare Routes</h1>

      {/* AI Suggestion */}
      <Card className="border-green-600">
        <CardHeader>
          <CardTitle>AI Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            ✅ <strong>{best.name}</strong> is the most efficient route.
          </p>
          <p className="text-muted-foreground mt-2">
            Saves <strong>18 kg CO₂</strong> and <strong>₹ 600</strong> compared to Route A.
          </p>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Route</th>
                <th className="py-2">Distance</th>
                <th className="py-2">Fuel</th>
                <th className="py-2">Emissions</th>
                <th className="py-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr
                  key={r.id}
                  className={`border-b ${r.id === best.id ? "bg-green-50 dark:bg-green-950/20" : ""}`}
                >
                  <td className="py-2 font-medium">{r.name}</td>
                  <td className="py-2">{r.distance}</td>
                  <td className="py-2">{r.fuel}</td>
                  <td className="py-2">{r.emissions}</td>
                  <td className="py-2">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Total CO₂ Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">18 kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuel Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">7 L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">₹ 600</p>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}
