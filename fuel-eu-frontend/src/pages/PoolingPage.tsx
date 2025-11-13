import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Pool = {
  id: number
  vessel: string
  fuelType: string
  amount: number
}

export default function PoolingPage() {
  const [pools, setPools] = useState<Pool[]>([
    { id: 1, vessel: "Vessel A", fuelType: "HVO", amount: 120 },
    { id: 2, vessel: "Vessel B", fuelType: "LNG", amount: 90 },
    { id: 3, vessel: "Vessel C", fuelType: "Methanol", amount: 150 },
  ])

  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [vessel, setVessel] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [amount, setAmount] = useState("")

  // Filter logic
  const filtered = useMemo(() => {
    return pools.filter((p) =>
      p.vessel.toLowerCase().includes(search.toLowerCase())
    )
  }, [pools, search])

  const addPool = () => {
    if (!vessel || !fuelType || !amount) return

    setPools([
      ...pools,
      {
        id: pools.length + 1,
        vessel,
        fuelType,
        amount: Number(amount),
      },
    ])

    // Reset
    setVessel("")
    setFuelType("")
    setAmount("")
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pooling</h1>
          <p className="text-gray-500">Manage vessel fuel pooling data</p>
        </div>

        <Button onClick={() => setShowModal(true)}>
          Add Pool
        </Button>
      </div>

      {/* SEARCH BAR */}
      <Input
        placeholder="Search vessel..."
        className="w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg p-2">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Vessel</th>
              <th className="p-3">Fuel Type</th>
              <th className="p-3">Amount (tons)</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.vessel}</td>
                  <td className="p-3">{p.fuelType}</td>
                  <td className="p-3">{p.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  No matching data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] space-y-4">
            <h2 className="text-xl font-semibold">Add New Pool</h2>

            <Input
              placeholder="Vessel Name"
              value={vessel}
              onChange={(e) => setVessel(e.target.value)}
            />

            <Input
              placeholder="Fuel Type"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />

            <Input
              placeholder="Amount (tons)"
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={addPool}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
