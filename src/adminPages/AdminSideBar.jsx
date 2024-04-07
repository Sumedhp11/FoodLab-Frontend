import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Store, ShoppingBag } from "lucide-react";
const AdminLinks = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: User,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: Store,
    label: "Restaurants",
    href: "/admin/restaurants",
  },
  {
    icon: ShoppingBag,
    label: "Orders",
    href: "/admin/orders",
  },
];
const AdminSideBar = () => {
  const location = useLocation();

  return (
    <div className="w-[15%] h-[100vh] shadow-[14px_0px_15px_10px_#00000024]  flex flex-col px-4 space-y-6 py-4 ">
      {AdminLinks.map((link) => (
        <Link key={link.label} to={link.href}>
          <div
            className={`w-full p-3 flex items-center gap-3 shadow-lg ${
              location.pathname === link.href ? "bg-green-700 rounded-md" : null
            }`}
          >
            <link.icon
              size={30}
              color={`${location.pathname === link.href ? "white" : "black"}`}
            />
            <p
              className={`font-normal ${
                location.pathname === link.href ? "text-white" : "text-black"
              }`}
            >
              {link.label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSideBar;
