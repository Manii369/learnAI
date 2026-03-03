import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Brain, Clock, TrendingUp, Video, FileText, Star, MessageCircle, Award, Phone, Mail, MapPin, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const weakSubjects = [
  { name: "Calculus", score: 42, total: 100 },
  { name: "Organic Chemistry", score: 55, total: 100 },
  { name: "Data Structures", score: 63, total: 100 },
];

const recommendations = [
  { title: "Integration Techniques", type: "video", subject: "Calculus", duration: "18 min", icon: Video },
  { title: "Reaction Mechanisms PDF", type: "pdf", subject: "Chemistry", duration: "12 pages", icon: FileText },
  { title: "Binary Trees Explained", type: "video", subject: "DSA", duration: "24 min", icon: Video },
];

const examsTaken = [
  { name: "Mid-Semester Math", date: "Feb 12, 2026", score: 78, total: 100, grade: "B+" },
  { name: "Chemistry Unit Test", date: "Feb 20, 2026", score: 65, total: 100, grade: "B" },
  { name: "DSA Quiz 3", date: "Feb 25, 2026", score: 88, total: 100, grade: "A" },
  { name: "Physics Practical", date: "Mar 1, 2026", score: 72, total: 80, grade: "A-" },
];

const mentor = {
  name: "Dr. Sarah Chen",
  subject: "Computer Science",
  email: "sarah.chen@school.edu",
  phone: "+91 98765 43210",
  office: "Room 204, CS Block",
  availableHours: "Mon-Fri, 2:00 - 4:00 PM",
};

const classRanking = {
  rank: 12,
  totalStudents: 85,
  percentile: 86,
  overallScore: 74.5,
  classAverage: 68.2,
};

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your learning progress for this week</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Courses Active" value={6} icon={BookOpen} variant="primary" />
          <StatCard title="AI Score" value="72%" change="+5% this week" icon={Brain} />
          <StatCard title="Study Hours" value="14.5h" change="+2h from last week" icon={Clock} />
          <StatCard title="Improvement" value="+12%" icon={TrendingUp} variant="accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weak subjects */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold font-display text-foreground mb-4">Areas to Improve</h2>
            <div className="space-y-4">
              {weakSubjects.map((sub) => (
                <div key={sub.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-foreground">{sub.name}</span>
                    <span className="text-muted-foreground">{sub.score}%</span>
                  </div>
                  <Progress
                    value={sub.score}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold font-display text-foreground">AI Recommendations</h2>
              <Badge variant="secondary" className="gap-1">
                <Brain className="h-3 w-3" /> Personalized
              </Badge>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${rec.type === "video" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    <rec.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">{rec.subject} · {rec.duration}</p>
                  </div>
                  <Star className="h-4 w-4 text-muted-foreground/40" />
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/recommendations")}
            >
              View All Recommendations
            </Button>
          </div>
        </div>

        {/* Overall Score & Class Ranking */}
        <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> Class Standing
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-2xl font-bold font-display text-primary">{classRanking.rank}<span className="text-sm text-muted-foreground">/{classRanking.totalStudents}</span></p>
              <p className="text-xs text-muted-foreground mt-1">Class Rank</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/10">
              <p className="text-2xl font-bold font-display text-accent">{classRanking.percentile}%</p>
              <p className="text-xs text-muted-foreground mt-1">Percentile</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary border border-border">
              <p className="text-2xl font-bold font-display text-foreground">{classRanking.overallScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Your Score</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary border border-border">
              <p className="text-2xl font-bold font-display text-foreground">{classRanking.classAverage}%</p>
              <p className="text-xs text-muted-foreground mt-1">Class Average</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exams Taken */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold font-display text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Exams Taken
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Exam</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Date</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Score</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {examsTaken.map((exam, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-medium text-foreground">{exam.name}</td>
                      <td className="py-3 text-muted-foreground">{exam.date}</td>
                      <td className="py-3 text-center text-foreground">{exam.score}/{exam.total}</td>
                      <td className="py-3 text-center">
                        <Badge variant={exam.score >= 80 ? "default" : "secondary"}>{exam.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mentor Contact */}
          <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-lg font-semibold font-display text-foreground mb-4">Your Mentor</h2>
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary">SC</span>
              </div>
              <p className="font-semibold text-foreground">{mentor.name}</p>
              <p className="text-sm text-muted-foreground">{mentor.subject}</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="truncate">{mentor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>{mentor.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{mentor.office}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>{mentor.availableHours}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = `mailto:${mentor.email}`}>
              Contact Mentor
            </Button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate("/doubts")} className="gradient-primary text-primary-foreground">
            <MessageCircle className="h-4 w-4 mr-2" /> Start Doubt Session
          </Button>
          <Button variant="outline" onClick={() => navigate("/recommendations")}>
            <Brain className="h-4 w-4 mr-2" /> Explore Content
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
