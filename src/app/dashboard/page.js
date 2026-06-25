// app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Mail,
  Globe,
  Users,
  Settings,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Download,
  Server,
  HardDrive,
  Zap,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

// Chart components (using recharts)
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [showRevenue, setShowRevenue] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for charts
  const mailVolumeData = [
    { date: "Mon", incoming: 2400, outgoing: 1800, spam: 400 },
    { date: "Tue", incoming: 2800, outgoing: 2200, spam: 350 },
    { date: "Wed", incoming: 3200, outgoing: 2500, spam: 600 },
    { date: "Thu", incoming: 2900, outgoing: 2300, spam: 450 },
    { date: "Fri", incoming: 3500, outgoing: 2800, spam: 700 },
    { date: "Sat", incoming: 1800, outgoing: 1400, spam: 200 },
    { date: "Sun", incoming: 1500, outgoing: 1200, spam: 150 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 1200, active: 980 },
    { month: "Feb", users: 1350, active: 1100 },
    { month: "Mar", users: 1500, active: 1250 },
    { month: "Apr", users: 1650, active: 1380 },
    { month: "May", users: 1800, active: 1520 },
    { month: "Jun", users: 1892, active: 1620 },
  ];

  const domainDistribution = [
    { name: "Active", value: 47, color: "#14b8a6" },
    { name: "Suspended", value: 8, color: "#f59e0b" },
    { name: "Pending", value: 5, color: "#3b82f6" },
    { name: "Deleted", value: 3, color: "#ef4444" },
  ];

  const mailboxUsage = [
    { name: "Storage Used", value: 65, color: "#14b8a6" },
    { name: "Available", value: 35, color: "#e5e7eb" },
  ];

  // Stats data
  const stats = [
    {
      label: "Total Mailboxes",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Mail,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Domains",
      value: "47",
      change: "+3.2%",
      trend: "up",
      icon: Globe,
      color: "bg-teal-50 text-teal-600",
    },
    {
      label: "Total Users",
      value: "1,892",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "System Health",
      value: "98.6%",
      change: "-0.4%",
      trend: "down",
      icon: Activity,
      color: "bg-green-50 text-green-600",
    },
  ];

  // Quick stats for mailboxes
  const mailboxStats = [
    { label: "Total", value: "1,284", color: "bg-blue-500" },
    { label: "Active", value: "1,156", color: "bg-green-500" },
    { label: "Suspended", value: "78", color: "bg-yellow-500" },
    { label: "Deleted", value: "50", color: "bg-red-500" },
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new mailbox",
      target: "john@company.com",
      time: "2 minutes ago",
      type: "create",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated domain settings",
      target: "company.com",
      time: "15 minutes ago",
      type: "update",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Deleted user account",
      target: "mike@oldcompany.com",
      time: "1 hour ago",
      type: "delete",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "Added new domain",
      target: "newcompany.com",
      time: "2 hours ago",
      type: "create",
    },
    {
      id: 5,
      user: "David Brown",
      action: "Changed user role",
      target: "emily@company.com (Admin)",
      time: "3 hours ago",
      type: "update",
    },
  ];

  // Domain stats
  const domainStats = [
    { domain: "company.com", mailboxes: 342, status: "Active", growth: "+12%" },
    { domain: "enterprise.org", mailboxes: 189, status: "Active", growth: "+8%" },
    { domain: "startup.io", mailboxes: 67, status: "Active", growth: "+23%" },
    { domain: "techhub.com", mailboxes: 45, status: "Pending", growth: "+45%" },
    { domain: "oldcompany.com", mailboxes: 23, status: "Suspended", growth: "-5%" },
  ];

  // Alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Storage usage at 85% on server-01",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "New domain registration: techhub.com",
      time: "30 minutes ago",
    },
    {
      id: 3,
      type: "error",
      message: "Failed login attempt from IP 192.168.1.100",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "success",
      message: "System backup completed successfully",
      time: "2 hours ago",
    },
  ];

  // System metrics
  const systemMetrics = [
    { label: "CPU Usage", value: 45, color: "text-blue-600" },
    { label: "Memory Usage", value: 62, color: "text-teal-600" },
    { label: "Storage", value: 78, color: "text-purple-600" },
    { label: "Network", value: 34, color: "text-green-600" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard className="text-teal-600" size={28} />
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back! Here's what's happening with your mail hosting platform
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <button
              onClick={() => setShowRevenue(!showRevenue)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showRevenue ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <span className="text-xs text-gray-500">Show details</span>
          </div>
          <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-sm transition-all flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap items-center gap-2">
        {["today", "week", "month", "year"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              timeRange === range
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {range}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight size={16} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-600" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-3">{stat.value}</p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mail Volume Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 size={18} className="text-teal-600" />
                Mail Volume
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Incoming vs Outgoing emails</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mailVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="incoming"
                stackId="1"
                stroke="#14b8a6"
                fill="#14b8a6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="outgoing"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="spam"
                stackId="2"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Users size={18} className="text-teal-600" />
                User Growth
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              +8.7%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Domain Distribution */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <PieChart size={18} className="text-teal-600" />
            Domain Status
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={domainDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {domainDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-4">
            {domainDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Domains */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Globe size={18} className="text-teal-600" />
              Top Domains
            </h3>
            <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {domainStats.map((domain, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <Globe size={16} className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{domain.domain}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{domain.mailboxes} mailboxes</span>
                      <span className="text-xs text-green-600 font-medium">{domain.growth}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    domain.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : domain.status === "Pending"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {domain.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Server size={18} className="text-teal-600" />
            System Health
          </h3>
          <div className="space-y-4">
            {systemMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{metric.label}</span>
                  <span className={`font-medium ${metric.color}`}>{metric.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      metric.value > 70
                        ? "bg-yellow-500"
                        : metric.value > 85
                        ? "bg-red-500"
                        : "bg-teal-500"
                    }`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              <p className="text-xs text-green-700 font-medium">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row: Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Clock size={18} className="text-teal-600" />
                Recent Activity
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest actions from your team</p>
            </div>
            <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      activity.type === "create"
                        ? "bg-green-500"
                        : activity.type === "delete"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-500"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 truncate">{activity.target}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <AlertCircle size={18} className="text-teal-600" />
                Alerts
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">System notifications</p>
            </div>
            <span className="text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-medium">
              {alerts.filter(a => a.type === 'error' || a.type === 'warning').length} new
            </span>
          </div>
          <div className="space-y-3 max-h-[300] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-xl border transition-all hover:shadow-sm ${
                  alert.type === "error"
                    ? "bg-red-50 border-red-200"
                    : alert.type === "warning"
                    ? "bg-yellow-50 border-yellow-200"
                    : alert.type === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  {alert.type === "error" ? (
                    <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                  ) : alert.type === "warning" ? (
                    <AlertCircle size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                  ) : alert.type === "success" ? (
                    <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-gray-500 hover:text-teal-600 transition-colors font-medium border-t border-gray-100 pt-3">
            View All Alerts →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group">
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto group-hover:bg-teal-100 transition-colors">
            <Mail className="text-teal-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-700 mt-2">Add Mailbox</p>
          <p className="text-xs text-gray-400">Create new mailbox</p>
        </button>
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-100 transition-colors">
            <Globe className="text-blue-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-700 mt-2">Add Domain</p>
          <p className="text-xs text-gray-400">Register new domain</p>
        </button>
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto group-hover:bg-purple-100 transition-colors">
            <Users className="text-purple-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-700 mt-2">Add User</p>
          <p className="text-xs text-gray-400">Invite team member</p>
        </button>
        <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto group-hover:bg-green-100 transition-colors">
            <Settings className="text-green-600" size={24} />
          </div>
          <p className="text-sm font-medium text-gray-700 mt-2">Settings</p>
          <p className="text-xs text-gray-400">Configure platform</p>
        </button>
      </div>
    </div>
  );
}