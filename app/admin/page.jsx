import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const siteControls = [
  { title: "Home", href: "/", note: "Manage top-level experience and hero flow." },
  { title: "Services", href: "/services", note: "Control all service pages and updates." },
  { title: "Pricing", href: "/pricing", note: "Review and update package offerings." },
  { title: "Coverage", href: "/coverage", note: "Oversee location and network availability info." },
  { title: "Offers", href: "/offers", note: "Manage campaigns, discounts and promos." },
  { title: "Articles", href: "/articles", note: "Control blog/news publishing priorities." },
  { title: "ERP", href: "/erp", note: "Access ERP and operations-focused modules." },
  { title: "Selfcare", href: "/selfcare", note: "Manage customer self-service experience." },
  { title: "Contact", href: "/contact", note: "Oversee support, communication and lead capture." },
];

export default async function MasterAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("master_admin_session")?.value;
  const validSession = process.env.MASTER_ADMIN_SESSION_TOKEN || "master-admin-active";

  if (!session || session !== validSession) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-orange-400 font-bold tracking-wider text-sm">MASTER ADMIN PANEL</p>
            <h1 className="text-3xl lg:text-5xl font-black">Control the Whole Site</h1>
          </div>

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-black"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteControls.map((control) => (
            <div
              key={control.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-400/60 transition-all"
            >
              <h2 className="text-xl font-black mb-2">{control.title}</h2>
              <p className="text-slate-300 text-sm mb-5">{control.note}</p>
              <Link
                href={control.href}
                className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-sm font-bold"
              >
                Open Section
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
