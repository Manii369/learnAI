import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, BookOpen, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { month: "Jan", students: 85, teachers: 12 },
  { month: "Feb", students: 120, teachers: 15 },
  { month: "Mar", students: 145, teachers: 18 },
  { month: "Apr", students: 180, teachers: 20 },
  { month: "May", students: 210, teachers: 22 },
  { month: "Jun", students: 240, teachers: 25 },
];

const pieData = [
  { name: "Science", value: 35 },
  { name: "Math", value: 28 },
  { name: "English", value: 20 },
  { name: "CS", value: 17 },
];

const COLORS = [
  "hsl(230, 72%, 52%)",
  "hsl(168, 72%, 40%)",
  "hsl(32, 95%, 55%)",
  "hsl(280, 60%, 55%)",
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="1,247" change="+18% this month" icon={Users} variant="primary" />
          <StatCard title="Active Courses" value={42} icon={BookOpen} />
          <StatCard title="Completion Rate" value="73%" change="+4%" icon={TrendingUp} variant="accent" />
          <StatCard title="Daily Active" value={386} icon={Activity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold font-display text-foreground mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Bar dataKey="students" fill="hsl(230, 72%, 52%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="teachers" fill="hsl(168, 72%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold font-display text-foreground mb-4">Subjects</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-medium text-foreground ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
