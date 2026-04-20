// app/reports/page.tsx
// Server Component — tidak butuh "use client"

import AdminLayout from "@/components/AdminLayout";
import {
  BookOpen,
  CheckCircle,
  ArrowRightLeft,
  DollarSign,
  Download,
} from "lucide-react";

// ── Dummy Data ─────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", borrowed: 320, returned: 295 },
  { month: "Feb", borrowed: 380, returned: 340 },
  { month: "Mar", borrowed: 410, returned: 390 },
  { month: "Apr", borrowed: 360, returned: 350 },
  { month: "May", borrowed: 430, returned: 400 },
  { month: "Jun", borrowed: 390, returned: 370 },
];

const categoryData = [
  { name: "Fiction", count: 4520, pct: 42, color: "#2563eb" },
  { name: "Technology", count: 3110, pct: 30, color: "#60a5fa" },
  { name: "Others", count: 4820, pct: 28, color: "#e5e7eb" },
];

const finesData = [
  {
    name: "Marcus Wright",
    email: "m.wright@university.edu",
    type: "Faculty",
    borrowed: 5,
    fines: 15.5,
  },
  {
    name: "Sarah Kim",
    email: "s.kim@public.org",
    type: "Public",
    borrowed: 0,
    fines: 25.0,
  },
  {
    name: "Priya Sharma",
    email: "p.sharma@university.edu",
    type: "Faculty",
    borrowed: 4,
    fines: 5.0,
  },
];

const maxBorrowed = Math.max(...monthlyData.map((d) => d.borrowed));

// ── Main Page ──────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const totalFines = finesData.reduce((s, m) => s + m.fines, 0);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Reports
          </h1>
          <p className="text-gray-500 mt-1">
            Library performance overview and statistics
          </p>
        </div>

        {/* Summary Cards - same style as dashboard StatCard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Books",
              value: "8",
              icon: <BookOpen size={16} />,
              iconBg: "bg-blue-100 text-blue-600",
              change: "in catalog",
              changeType: "neutral",
            },
            {
              title: "Available",
              value: "6",
              icon: <CheckCircle size={16} />,
              iconBg: "bg-green-100 text-green-600",
              change: "books",
              changeType: "neutral",
            },
            {
              title: "Lent Out",
              value: "2",
              icon: <ArrowRightLeft size={16} />,
              iconBg: "bg-orange-100 text-orange-500",
              change: "books",
              changeType: "neutral",
            },
            {
              title: "Total Fines",
              value: `$${totalFines.toFixed(2)}`,
              icon: <DollarSign size={16} />,
              iconBg: "bg-emerald-100 text-emerald-600",
              change: "outstanding",
              changeType: "neutral",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}
              >
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {s.title}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {s.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {s.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">
                Monthly Borrowing Activity
              </h3>
              <div className="flex items-center gap-5 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  Borrowed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
                  Returned
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-52">
              {monthlyData.map((data) => (
                <div
                  key={data.month}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex items-end justify-center gap-1 flex-1">
                    <div
                      className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-colors"
                      style={{
                        height: `${(data.borrowed / maxBorrowed) * 100}%`,
                      }}
                      title={`Borrowed: ${data.borrowed}`}
                    />
                    <div
                      className="w-full bg-gray-200 rounded-t-lg hover:bg-gray-300 transition-colors"
                      style={{
                        height: `${(data.returned / maxBorrowed) * 100}%`,
                      }}
                      title={`Returned: ${data.returned}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-6">
              Category Distribution
            </h3>

            {/* Simple donut visual */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[18px] border-blue-100" />
                <div
                  className="absolute inset-0 rounded-full border-[18px] border-blue-600 border-t-transparent border-l-transparent"
                  style={{ transform: "rotate(45deg)" }}
                />
                <div className="text-center z-10">
                  <span className="block text-2xl font-extrabold text-gray-900">
                    42%
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">
                    Fiction
                  </span>
                </div>
              </div>
            </div>

            {/* Category bars */}
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-gray-700">
                        {cat.name}
                      </span>
                    </div>
                    <span className="font-extrabold text-gray-900">
                      {cat.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${cat.pct}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outstanding Fines Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">
              Outstanding Fines
            </h3>
            <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline cursor-pointer">
              <Download size={15} />
              Export Report
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                {[
                  "Member",
                  "Type",
                  "Books Borrowed",
                  "Fine Amount",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {finesData
                .sort((a, b) => b.fines - a.fines)
                .map((member) => {
                  const initials = member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <tr
                      key={member.name}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-semibold">
                        {member.type}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700">
                        {member.borrowed}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-red-600 font-extrabold text-base">
                          ${member.fines.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold rounded-xl transition-colors cursor-pointer">
                          Mark Paid
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
