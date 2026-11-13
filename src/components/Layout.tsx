import { NavLink, Outlet } from "react-router";
import { Users } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) => (
  `rounded-lg px-2 py-2 text-sm whitespace-nowrap sm:px-3 font-medium transition ${isActive
    ? "bg-brand-50 text-brand-700"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
);

function Layout() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-x-2 text-lg font-bold text-slate-900">
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
              <Users className="h-4 w-4"/>
            </span>
            <span className="max-sm:sr-only">HRnet</span>
          </NavLink>

          <nav aria-label="Main" className="flex items-center gap-x-1">
            <NavLink to="/" end className={navLinkClass}>Create employee</NavLink>
            <NavLink to="/employee-list" className={navLinkClass}>Current employees</NavLink>
          </nav>
        </div>
      </header>

      <Outlet/>
    </>
  )
}

export default Layout;
