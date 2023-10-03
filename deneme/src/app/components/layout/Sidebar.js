// components/layout/Sidebar.js
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gray-200 w-1/4 p-4">
      <ul>
        <li>
          <Link href="/dashboard">
            <a className="text-blue-600 hover:underline">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/inventory">
            <a className="text-blue-600 hover:underline">Inventory</a>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <a className="text-blue-600 hover:underline">Orders</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
