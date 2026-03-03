import DashboardLayout from "@/components/DashboardLayout";
import { Brain, Video, FileText, Star, ExternalLink, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allRecs = [
  { title: "Integration by Parts - Complete Guide", type: "video", subject: "Calculus", duration: "18 min", rating: 4.8, reason: "Low score in integration" },
  { title: "Organic Reaction Mechanisms", type: "pdf", subject: "Chemistry", duration: "24 pages", rating: 4.6, reason: "Weak in organic chemistry" },
  { title: "Binary Search Trees Deep Dive", type: "video", subject: "Data Structures", duration: "32 min", rating: 4.9, reason: "Struggling with trees" },
  { title: "Linear Algebra Essentials", type: "pdf", subject: "Mathematics", duration: "18 pages", rating: 4.5, reason: "Low quiz scores" },
  { title: "Thermodynamics Explained", type: "video", subject: "Physics", duration: "22 min", rating: 4.7, reason: "Below average in thermo" },
  { title: "Graph Algorithms Masterclass", type: "video", subject: "Data Structures", duration: "45 min", rating: 4.9, reason: "Needs graph practice" },
  { title: "Chemical Bonding Cheat Sheet", type: "pdf", subject: "Chemistry", duration: "8 pages", rating: 4.3, reason: "Weak fundamentals" },
  { title: "Differential Equations", type: "video", subject: "Calculus", duration: "28 min", rating: 4.6, reason: "Low score in diff-eq" },
];

const subjects = ["All", "Calculus", "Chemistry", "Data Structures", "Mathematics", "Physics"];

export default function RecommendationsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? allRecs : allRecs.filter(r => r.subject === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold font-display text-foreground">AI Recommendations</h1>
          </div>
          <p className="text-muted-foreground mt-1">Personalized content based on your weak areas</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {subjects.map(s => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className={filter === s ? "gradient-primary text-primary-foreground" : ""}
            >
              {s}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rec, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow animate-fade-in cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg shrink-0 ${rec.type === "video" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {rec.type === "video" ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rec.subject} · {rec.duration}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                      <span className="text-xs font-medium text-foreground">{rec.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{rec.type.toUpperCase()}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    💡 {rec.reason}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
