// components/AdminDashboard.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Search,
  Bell,
  HelpCircle,
  ArrowRightLeft,
  Plus,
  UserPlus,
  AlertCircle,
  DollarSign,
  Clock,
} from "lucide-react";

// --- Reusable Components ---
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => (
  <div
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  changeType?: "up" | "neutral";
}

const StatCard = ({
  title,
  value,
  change,
  icon,
  iconBg,
  changeType = "up",
}: StatCardProps) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {title}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            changeType === "up"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

interface ActivityItemProps {
  title: string;
  subtitle: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ActivityItem = ({
  title,
  subtitle,
  time,
  icon,
  iconBg,
}: ActivityItemProps) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl">
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 italic">{subtitle}</p>
      </div>
    </div>
    <span className="text-xs font-medium text-gray-400">{time}</span>
  </div>
);

// --- Main Page Component ---
export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col py-6 flex-shrink-0">
        <div className="text-2xl font-extrabold text-gray-900 px-6 pb-6">
          Lib<span className="text-blue-600">Flow</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={16} />}
            label="Dashboard"
            active
          />
          <SidebarItem icon={<BookOpen size={16} />} label="Manage Books" />
          <SidebarItem icon={<Users size={16} />} label="Members" />
          <SidebarItem icon={<BarChart3 size={16} />} label="Reports" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search books, users, or transactions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-blue-600 transition-colors relative p-2 rounded-full hover:bg-gray-50">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-50">
                <HelpCircle size={18} />
              </button>
            </div>
            <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Sarah Jenkins</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">
                  Head Librarian
                </p>
              </div>
              <Image
                src="/daniel.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-blue-500 p-0.5"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Overview
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back, Sarah. Here&apos;s what&apos;s happening today in
              LibFlow.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Books"
              value="12,450"
              change="+12%"
              icon={<BookOpen size={16} />}
              iconBg="bg-blue-100 text-blue-600"
            />
            <StatCard
              title="Active Members"
              value="3,200"
              change="+4%"
              icon={<Users size={16} />}
              iconBg="bg-purple-100 text-purple-600"
            />
            <StatCard
              title="Books Lent Out"
              value="845"
              change="Steady"
              icon={<ArrowRightLeft size={16} />}
              iconBg="bg-orange-100 text-orange-500"
              changeType="neutral"
            />
            <StatCard
              title="Total Fines"
              value="$1,240"
              change="+2.4%"
              icon={<DollarSign size={16} />}
              iconBg="bg-emerald-100 text-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-lg flex items-center">
                  <span className="mr-2 text-blue-600">
                    <Clock size={16} />
                  </span>
                  Recent Activities
                </h3>
                <button className="text-blue-600 font-bold text-sm hover:underline">
                  View All
                </button>
              </div>
              <div className="p-2">
                <ActivityItem
                  title="Book Returned"
                  subtitle="The Great Gatsby returned by Alex Rivera"
                  time="2 mins ago"
                  icon={<ArrowRightLeft size={16} />}
                  iconBg="bg-blue-100 text-blue-600"
                />
                <ActivityItem
                  title="New Member"
                  subtitle="Elena Gilbert joined as a Student member"
                  time="15 mins ago"
                  icon={<UserPlus size={16} />}
                  iconBg="bg-purple-100 text-purple-600"
                />
                <ActivityItem
                  title="New Inventory"
                  subtitle='5 copies of "Deep Work" added to Science section'
                  time="1 hour ago"
                  icon={<Plus size={16} />}
                  iconBg="bg-orange-100 text-orange-600"
                />
                <ActivityItem
                  title="Fine Paid"
                  subtitle="Marcus Wright paid $15.50 overdue fine"
                  time="3 hours ago"
                  icon={<AlertCircle size={16} />}
                  iconBg="bg-red-100 text-red-600"
                />
              </div>
            </div>

            {/* Quick Actions & System Health */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Plus size={18} />
                    <span>Add New Book</span>
                  </button>
                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all">
                    <Users size={18} />
                    <span>Manage Users</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-6">
                  System Overview
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-gray-500 uppercase">
                        Storage Capacity
                      </span>
                      <span className="text-blue-600 font-black tracking-tight">
                        82%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[82%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-gray-500 uppercase">
                        Server Uptime
                      </span>
                      <span className="text-green-600 font-black tracking-tight">
                        99.9%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[99%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-bold text-gray-500 uppercase">
                      API Requests
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black uppercase rounded-lg tracking-tight">
                      Normal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
