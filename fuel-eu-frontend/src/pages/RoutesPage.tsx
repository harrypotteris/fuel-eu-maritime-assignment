import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RouteData {
  id: number;
  origin: string;
  destination: string;
  fuelType: string;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<RouteData[]>([
    { id: 1, origin: "New York", destination: "London", fuelType: "HVO" },
    { id: 2, origin: "Tokyo", destination: "Sydney", fuelType: "MGO" },
  ]);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof RouteData>("id");
  const [ascending, setAscending] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteData | null>(null);

  const [form, setForm] = useState({ origin: "", destination: "", fuelType: "" });

  // Filter + Sort
  const filteredRoutes = useMemo(() => {
    let data = routes.filter((r) =>
      Object.values(r).some((v) => v.toString().toLowerCase().includes(search.toLowerCase()))
    );

    data = data.sort((a, b) => {
      const x = a[sortKey].toString().toLowerCase();
      const y = b[sortKey].toString().toLowerCase();
      if (x < y) return ascending ? -1 : 1;
      if (x > y) return ascending ? 1 : -1;
      return 0;
    });

    return data;
  }, [search, sortKey, ascending, routes]);

  // Pagination
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredRoutes.length / rowsPerPage);
  const pageData = filteredRoutes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handlers
  const openAddModal = () => {
    setForm({ origin: "", destination: "", fuelType: "" });
    setEditingRoute(null);
    setOpenModal(true);
  };

  const openEditModal = (route: RouteData) => {
    setForm({
      origin: route.origin,
      destination: route.destination,
      fuelType: route.fuelType,
    });
    setEditingRoute(route);
    setOpenModal(true);
  };

  const saveRoute = () => {
    if (editingRoute) {
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === editingRoute.id ? { ...editingRoute, ...form } : r
        )
      );
    } else {
      setRoutes((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    }
    setOpenModal(false);
  };

  const deleteRoute = (id: number) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-8">

      {/* Search + Add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search routes..."
          className="border rounded px-3 py-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={openAddModal}
        >
          Add Route
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {["id", "origin", "destination", "fuelType"].map((key) => (
              <th
                key={key}
                className="border px-4 py-2 cursor-pointer"
                onClick={() => {
                  const k = key as keyof RouteData;
                  setAscending(k === sortKey ? !ascending : true);
                  setSortKey(k);
                }}
              >
                {key.toUpperCase()}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {pageData.map((route) => (
              <motion.tr
                key={route.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <td className="border px-4 py-2">{route.id}</td>
                <td className="border px-4 py-2">{route.origin}</td>
                <td className="border px-4 py-2">{route.destination}</td>
                <td className="border px-4 py-2">{route.fuelType}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => openEditModal(route)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteRoute(route.id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-3 py-1">{page} / {totalPages}</span>

        <button
          className="px-3 py-1 bg-gray-300 rounded"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded shadow w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {editingRoute ? "Edit Route" : "Add Route"}
              </h2>

              {/* Inputs */}
              {["origin", "destination", "fuelType"].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  className="border mb-2 w-full px-3 py-2 rounded"
                  value={(form as any)[f]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f]: e.target.value }))
                  }
                />
              ))}

              <div className="flex justify-end space-x-3 mt-3">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={saveRoute}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
