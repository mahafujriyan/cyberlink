import { notFound } from "next/navigation";

async function getApplication(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/apply`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.success) return null;

  return data.data.find((app) => app._id === id);
}

export default async function ApplicationDetails({ params }) {
  const { id } = await params;

  const app = await getApplication(id);

  if (!app) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-6xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">

        <h1 className="text-4xl font-black mb-10 text-orange-500">
          Connection Request Details
        </h1>

        {/* CUSTOMER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">

          <Field label="Full Name" value={app.fullName} />
          <Field label="Email" value={app.email} />
          <Field label="Mobile" value={app.mobile || app.phone} />
          <Field label="NID" value={app.nid || "Not Provided"} />

          <Field label="Package" value={app.package} highlight />
          <Field label="Location" value={app.location} />

          <Field label="Flat No" value={app.flatNo} />
          <Field label="House No" value={app.houseNo} />
          <Field label="Road No" value={app.roadNo} />
          <Field label="Area" value={app.area} />
          <Field label="Landmark" value={app.landmark} />

          <Field
            label="Status"
            value={(app.status || "pending").toUpperCase()}
            highlight
          />

          <Field
            label="Requested At"
            value={
              app.requestedAt
                ? new Date(app.requestedAt).toLocaleString()
                : "N/A"
            }
          />

          <Field
            label="Last Updated"
            value={
              app.updatedAt
                ? new Date(app.updatedAt).toLocaleString()
                : "N/A"
            }
          />

        </div>

      </div>
    </div>
  );
}

function Field({ label, value, highlight }) {
  return (
    <div>
      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={`font-bold text-lg ${
          highlight ? "text-orange-400" : "text-white"
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}