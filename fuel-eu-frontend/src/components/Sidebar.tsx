import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Routes", path: "/routes" },
    { name: "Compare", path: "/compare" },
    { name: "Banking", path: "/banking" },
    { name: "Pooling", path: "/pooling" },
  ];

  return (
    <aside className="w-56 h-full border-r p-4 bg-gray-50">
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-2 rounded-md ${
              pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
