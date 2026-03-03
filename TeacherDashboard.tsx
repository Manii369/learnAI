import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, TrendingUp, BookOpen, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const students = [
  { name: "Alex Johnson", score: 72, trend: "+5%", status: "improving" },
  { name: "Maria Garcia", score: 88, trend: "+2%", status: "excellent" },
  { name: "James Lee", score: 45, trend: "-3%", status: "needs-help" },
  { name: "Priya Patel", score: 67, trend: "+8%", status: "improving" },
  { name: "Tom Wilson", score: 53, trend: "+1%", status: "needs-help" },
];

const statusColors: Record<string, string> = {
  excellent: "bg-success/10 text-success",
  improving: "bg-primary/10 text-primary",
  "needs-help": "bg-destructive/10 text-destructive",
};

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor student progress and performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Students" value={128} icon={Users} variant="primary" />
          <StatCard title="Avg. Score" value="68%" change="+3% this month" icon={TrendingUp} />
          <StatCard title="Courses" value={8} icon={BookOpen} />
          <StatCard title="At Risk" value={12} icon={AlertTriangle} variant="warning" />
        </div>

        {/* Student list */}
        <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4">Student Performance</h2>
          <div className="space-y-3">
            {students.map((s) => (
              <div key={s.name} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={s.score} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-10">{s.score}%</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-success">{s.trend}</span>
                <Badge variant="secondary" className={`text-xs ${statusColors[s.status]}`}>
                  {s.status === "needs-help" ? "Needs Help" : s.status === "excellent" ? "Excellent" : "Improving"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
