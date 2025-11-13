import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Route as RouteIcon,
  GitCompare,
  Banknote,
  Layers
} from "lucide-react";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Routes", path: "/routes", icon: RouteIcon },
    { name: "Compare", path: "/compare", icon: GitCompare },
    { name: "Banking", path: "/banking", icon: Banknote },
    { name: "Pooling", path: "/pooling", icon: Layers },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 70 : 230 }}
        transition={{ duration: 0.25 }}
        className="border-r bg-card h-screen p-3 flex flex-col gap-4 shadow-md"
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  "hover:bg-muted hover:text-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />

              {/* Hide text when collapsed */}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
