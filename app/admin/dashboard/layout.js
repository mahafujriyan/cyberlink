import Link from 'next/link';
import { LayoutDashboard, Users, MapPin, Gift, Globe, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: <LayoutDashboard size={20}/> },
    { name: 'Applications', href: '/admin/dashboard/applications', icon: <Users size={20}/> },
    { name: 'Coverage', href: '/admin/dashboard/coverage', icon: <MapPin size={20}/> },
    { name: 'Offers', href: '/admin/dashboard/offers', icon: <Gift size={20}/> },
    { name: 'Site Settings', href: '/admin/dashboard/settings', icon: <Globe size={20}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-white/5 p-6 fixed h-full">
      
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-600/10 hover:text-orange-500 transition-all font-bold text-sm border border-transparent hover:border-orange-600/20">
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-10 left-6 right-6">
           <form action="/api/admin/logout" method="POST">
             <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 p-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
               <LogOut size={18}/> Logout
             </button>
           </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
