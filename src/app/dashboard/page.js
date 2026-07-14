"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserPlus,
  Settings,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Server,
  Shield,
  Eye,
  EyeOff,
  Mail,
  UserCog,
  Briefcase,
  UserRoundPlus,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast, { Toaster } from "react-hot-toast";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [showDetails, setShowDetails] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [companyStats, setCompanyStats] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [referredPeople, setReferredPeople] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName") || "User";
    setUserRole(role);
    setUserName(name);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId") || "system";

      const response = await fetch(`/api/dashboard`, {
        headers: { "x-user-id": userId }
      });
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.stats || {});
        setRecentActivity(data.data.recentActivity || []);
        setAlerts(data.data.alerts || []);
        setChartData(data.data.chartData || []);
        setCompanyStats(data.data.companyStats || []);
        setRecentStudents(data.data.recentStudents || []);
        setReferredPeople(data.data.referredPeople || []);
        setCompanyName(data.data.stats?.companyName || '');
      } else {
        toast.error(data.message || "Failed to load dashboard");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const superadminStats = [
    { label: "Total Companies", value: stats.totalCompanies || 0, change: "+0%", trend: "up", icon: Building2, color: "bg-indigo-50 text-indigo-600" },
    { label: "Total Admins", value: stats.totalAdmins || 0, change: "+0%", trend: "up", icon: UserCog, color: "bg-purple-50 text-purple-600" },
    { label: "Total Students", value: stats.totalStudents || 0, change: "+0%", trend: "up", icon: Users, color: "bg-teal-50 text-teal-600" },
    { label: "Referred People", value: stats.totalReferred || 0, change: "+0%", trend: "up", icon: UserRoundPlus, color: "bg-blue-50 text-blue-600" },
  ];

  const adminStats = [
    { label: "My Students", value: stats.myStudents || 0, change: "+0%", trend: "up", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Company Students", value: stats.totalCompanyStudents || 0, change: "+0%", trend: "up", icon: Building2, color: "bg-teal-50 text-teal-600" },
    { label: "Referred People", value: stats.totalReferred || 0, change: "+0%", trend: "up", icon: UserRoundPlus, color: "bg-purple-50 text-purple-600" },
    { label: "Active", value: "Active", change: "+0%", trend: "up", icon: CheckCircle, color: "bg-green-50 text-green-600" },
  ];

  const displayStats = userRole === 'superadmin' ? superadminStats : adminStats;

  const quickActions = userRole === 'superadmin' ? [
    { icon: Building2, label: "Add Company", desc: "Create new company", color: "text-indigo-600", bg: "bg-indigo-50", href: "/dashboard/managecompanies" },
    { icon: UserCog, label: "Add Admin", desc: "Create admin account", color: "text-purple-600", bg: "bg-purple-50", href: "/dashboard/admin-management" },
    { icon: Users, label: "View All", desc: "See all students", color: "text-teal-600", bg: "bg-teal-50", href: "/dashboard/usermanagement" },
    { icon: Settings, label: "Settings", desc: "Platform settings", color: "text-gray-600", bg: "bg-gray-50", href: "#" },
  ] : [
    { icon: UserPlus, label: "Add Student", desc: "Create new student", color: "text-teal-600", bg: "bg-teal-50", href: "/dashboard/usermanagement" },
    { icon: Users, label: "My Students", desc: "View my students", color: "text-blue-600", bg: "bg-blue-50", href: "/dashboard/usermanagement" },
    { icon: Building2, label: "My Company", desc: "View company details", color: "text-purple-600", bg: "bg-purple-50", href: "#" },
    { icon: UserRoundPlus, label: "Add Referral", desc: "Add referred person", color: "text-orange-600", bg: "bg-orange-50", href: "#" },
  ];

  const getQuickStats = () => {
    if (userRole === 'superadmin') {
      return [
        { label: "Active Companies", value: stats.activeCompanies || 0, color: "text-indigo-600" },
        { label: "Total Admins", value: stats.totalAdmins || 0, color: "text-purple-600" },
        { label: "Total Students", value: stats.totalStudents || 0, color: "text-teal-600" },
        { label: "Referred People", value: stats.totalReferred || 0, color: "text-blue-600" },
      ];
    } else {
      return [
        { label: "My Students", value: stats.myStudents || 0, color: "text-teal-600" },
        { label: "Company Students", value: stats.totalCompanyStudents || 0, color: "text-blue-600" },
        { label: "Referred People", value: stats.totalReferred || 0, color: "text-purple-600" },
        { label: "Status", value: "Active", color: "text-green-600" },
      ];
    }
  };

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

  const quickStats = getQuickStats();

  return (
    <div className="space-y-6 pb-6">
      <Toaster position="top-right" />
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard className="text-teal-600" size={28} />
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {userRole === 'superadmin' 
              ? `Welcome back, ${userName}! Manage your platform overview.`
              : `Welcome back, ${userName}! ${companyName ? `Manage students for ${companyName}` : 'Manage your students'}`
            }
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {userRole === 'superadmin' && (
            <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1.5">
              <Shield size={14} />
              Super Admin
            </div>
          )}
          {userRole !== 'superadmin' && companyName && (
            <div className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium flex items-center gap-1.5">
              <Building2 size={14} />
              {companyName}
            </div>
          )}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showDetails ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <span className="text-xs text-gray-500">Show details</span>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
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
        {displayStats.map((stat, index) => (
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
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
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

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 size={18} className="text-teal-600" />
                {userRole === 'superadmin' ? 'Platform Growth' : 'Student Activity'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {userRole === 'superadmin' ? 'Companies & Students over time' : 'Student applications over time'}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.length > 0 ? chartData : [
              { month: "Jan", students: 0, companies: 0 },
              { month: "Feb", students: 0, companies: 0 },
              { month: "Mar", students: 0, companies: 0 },
              { month: "Apr", students: 0, companies: 0 },
              { month: "May", students: 0, companies: 0 },
              { month: "Jun", students: 0, companies: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={userRole === 'superadmin' ? "companies" : "students"}
                stackId="1"
                stroke="#14b8a6"
                fill="#14b8a6"
                fillOpacity={0.6}
                name={userRole === 'superadmin' ? "Companies" : "Students"}
              />
              <Area
                type="monotone"
                dataKey={userRole === 'superadmin' ? "students" : "applications"}
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name={userRole === 'superadmin' ? "Students" : "Applications"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Server size={18} className="text-teal-600" />
            Quick Stats
          </h3>
          <div className="space-y-4">
            {quickStats.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <span className={`font-semibold ${metric.color}`}>{metric.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <p className="text-xs text-green-700 font-medium">
                {userRole === 'superadmin' ? 'All systems operational' : 'Your dashboard is active'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies / Students Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              {userRole === 'superadmin' ? (
                <Building2 size={18} className="text-indigo-600" />
              ) : (
                <Users size={18} className="text-teal-600" />
              )}
              {userRole === 'superadmin' ? 'Companies' : 'Recent Students'}
            </h3>
            <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {userRole === 'superadmin' ? (
              companyStats.length > 0 ? (
                companyStats.map((company, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <Building2 size={16} className="text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{company.name}</p>
                        <p className="text-xs text-gray-400">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{company.studentCount} students</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        company.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {company.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building2 size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm">No companies registered yet</p>
                </div>
              )
            ) : (
              recentStudents.length > 0 ? (
                recentStudents.map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                        <Users size={16} className="text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.course || 'No course'}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm">No students added yet</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Referred People / Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <UserRoundPlus size={18} className="text-teal-600" />
                {userRole === 'superadmin' ? 'Recent Referrals' : 'Referred People'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {userRole === 'superadmin' ? 'Latest referrals' : 'People referred by your company'}
              </p>
            </div>
          </div>
          <div className="space-y-3 max-h-[300] overflow-y-auto pr-1">
            {userRole === 'superadmin' ? (
              alerts.slice(0, 4).map((alert, idx) => (
                <div key={idx} className={`p-3 rounded-xl border transition-all hover:shadow-sm ${
                  alert.type === "error" ? "bg-red-50 border-red-200" :
                  alert.type === "warning" ? "bg-yellow-50 border-yellow-200" :
                  alert.type === "success" ? "bg-green-50 border-green-200" :
                  "bg-blue-50 border-blue-200"
                }`}>
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
              ))
            ) : (
              referredPeople.length > 0 ? (
                referredPeople.map((person, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <UserRoundPlus size={16} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{person.name}</p>
                        <p className="text-xs text-gray-400">{person.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{person.contact}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserRoundPlus size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm">No referred people</p>
                </div>
              )
            )}
          </div>
          {userRole !== 'superadmin' && (
            <button className="w-full mt-4 text-center text-sm text-gray-500 hover:text-teal-600 transition-colors font-medium border-t border-gray-100 pt-3">
              View All Referrals →
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group"
          >
            <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center mx-auto group-hover:bg-opacity-100 transition-colors`}>
              <action.icon className={action.color} size={24} />
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">{action.label}</p>
            <p className="text-xs text-gray-400">{action.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}